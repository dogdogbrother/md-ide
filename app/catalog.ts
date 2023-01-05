import { BrowserView, ipcMain, shell, dialog, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'
import { WindowsProp } from 'types/app'
import { setBrowserView } from './util/setBrowserView'
import loadUrl from './util/loadUrl'
import { getAllDoc } from './util/doc'

export function createCatalog(windows: WindowsProp, md_file: string) {
  windows.catalog = new BrowserView({
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  const { catalog, main } = windows
  setBrowserView(main as BrowserWindow, catalog)
  catalog.setBounds({ 
    x: 0, 
    y: 30, 
    width: 240, 
    height: 900,
  })
  catalog.setAutoResize({
    height: true,
    vertical: true
  })
  loadUrl(catalog, '/pages/catalog/index.html')
  catalog.webContents.openDevTools()
  ipcMain.on('getDocs', () => {
    getDocAndPost(catalog)
  })
  ipcMain.on('emptyMenu', e => {
    const template: MenuItemConstructorOptions[] = [
      {
        label: "新建markdown文档",
        // click: () => {
        //   // createFormDialog(window, 'addRootDoc')
        // }
      },
      {
        label: "新建目录",
        // click: () => {
        //   // createFormDialog(window, 'addDir')
        // }
      },
      { type: 'separator' },
      {
        label: "打开所在目录",
        // click: () => {
        //   // shell.openPath(join(md_file, 'docs'))
        // }
      }
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup({window: BrowserWindow.fromWebContents(e.sender) as BrowserWindow})
  })
  ipcMain.on('editMune', (e, info) => {
    // 通过 docName 和 dirName 的存在关系,判断编辑的是 文档 还是文件夹 还是文件夹下的文档
    const { docName, dirName } = JSON.parse(info)
  })
}

/**
 * @description 获取到目录信息的json,发给 catalog 窗口
 */
function getDocAndPost(window: BrowserView) {
  window.webContents.postMessage('getDocs', JSON.stringify(getAllDoc()))
}