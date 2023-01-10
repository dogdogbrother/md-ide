import { BrowserWindow, ipcMain } from 'electron'
import { WindowsProp, FormDialogAction, DorDirInfo, ActionInfoProp } from 'types/app'
import { getAllDoc } from './util/doc'
import { getDocPath } from './util/appPath'
import loadUrl from './util/loadUrl'
import fs from 'fs'
import { inform } from './util/notification'

export function createFormDialog(windows: WindowsProp, action: FormDialogAction, info: DorDirInfo = {} ) {
  windows.formDialog = new BrowserWindow({
    parent: windows.main,
    modal: true,
    width: 360,
    height: action ==='editDoc' ? 200 :  150,
    useContentSize: true,
    frame: false,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  loadUrl(windows.formDialog, '/pages/formDialog/index.html')
  windows.formDialog.webContents.openDevTools()
  ipcMain.on('getAllDoc', () => {
    windows.formDialog?.webContents.postMessage('getAllDoc', JSON.stringify(getAllDoc()))
  })
  ipcMain.on('getAction', () => {
    const actionInfo = {
      action,
      ...info
    }
    windows.formDialog?.webContents.postMessage('getAction', JSON.stringify(actionInfo))
  })
  ipcMain.on('formDialogClose', () => {
    windows.formDialog?.close()
  })
  ipcMain.on('editDoc', (_, info) => {
    const { action, dirName, docName, preDirName, preDocName }: ActionInfoProp = JSON.parse(info)
    // 文档编辑有几种情况 1. 根目录新建 2. 文件夹下新建 3. 重命名 4. 移动到其他的文件夹或者到根目录下同时改了名字
    if (action === 'editDoc') {
      // 没有原始文档值 即为新建
      if (!preDocName) {
        fs.writeFileSync(getDocPath(docName, dirName) + '.md', `#${docName}`)
        return editDocsSuccess(windows, '创建文档成功')
      }
      fs.renameSync(getDocPath(preDocName, preDirName) + '.md', getDocPath(docName, dirName) + '.md')
      editDocsSuccess(windows, '编辑文档成功')
    }
    if (action === 'editDir') {
      // 存在就是文件夹重命名
      if (preDirName) {
        fs.renameSync(getDocPath(undefined, preDirName), getDocPath(undefined, dirName))
        editDocsSuccess(windows, '文件夹重命名成功')
      } else {
        fs.mkdirSync(getDocPath(undefined, dirName))
        editDocsSuccess(windows, '创建文件夹成功')
      }
    }
  })
}

function editDocsSuccess(windows: WindowsProp, informMsg: string) {
  inform(informMsg)
  windows.formDialog?.close()
  windows.catalog?.webContents.postMessage('getDocs', JSON.stringify(getAllDoc()))
}