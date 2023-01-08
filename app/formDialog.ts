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
    // 200 125 150
    height: 150,
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
    const { action, dirName, docName }: ActionInfoProp = JSON.parse(info)
    if (action === 'editDoc') {
      // 编辑根目录的文档
      if (!dirName) {
        fs.writeFileSync(getDocPath(docName) + '.md', `#${docName}`)
        editDocsSuccess(windows, '创建文档成功')
      }
    }
    if (action === 'editDir') {
      fs.mkdirSync(getDocPath(undefined, dirName))
      editDocsSuccess(windows, '创建文件夹成功')
    }
  })
}

function editDocsSuccess(windows: WindowsProp, informMsg: string) {
  inform(informMsg)
  windows.formDialog?.close()
  windows.catalog?.webContents.postMessage('getDocs', JSON.stringify(getAllDoc()))
}