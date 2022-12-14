import { BrowserView, ipcMain, shell, dialog, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'
import { WindowsProp } from 'types/app'
import { setBrowserView } from './util/setBrowserView'
import loadUrl from './util/loadUrl'
import { getAllDoc } from './util/doc'
import { createFormDialog } from './formDialog'
import { getDocPath } from './util/appPath'

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
  // catalog.webContents.openDevTools()
  ipcMain.on('getDocs', () => {
    getDocAndPost(catalog)
  })
  // 右键空白处
  ipcMain.on('emptyMenu', e => {
    const template: MenuItemConstructorOptions[] = [
      {
        label: "新建markdown文档",
        click: () => {
          createFormDialog(windows, 'editDoc')
        }
      },
      {
        label: "新建目录",
        click: () => {
          createFormDialog(windows, 'editDir')
        }
      },
      { type: 'separator' },
      {
        label: "打开所在目录",
        click: () => {
          shell.openPath(getDocPath())
        }
      }
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup({window: BrowserWindow.fromWebContents(e.sender) as BrowserWindow})
  })
  // 右键文件夹
  ipcMain.on('editMune', (e, info) => {
    // 通过 docName 和 dirName 的存在关系,判断编辑的是 文档 还是文件夹 还是文件夹下的文档
    const { dirName } = JSON.parse(info)
    const template: MenuItemConstructorOptions[] = [
      {
        label: "重命名",
        click: () => {
          createFormDialog(windows, 'editDir', { dirName })
        }
      },
      {
        label: "此文件夹下创建文档",
        click: () => {
          createFormDialog(windows, 'editDoc', { dirName })
        }
      },
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup({window: BrowserWindow.fromWebContents(e.sender) as BrowserWindow})
  })
  // 右键文档
  ipcMain.on('editMenuDoc', (e, info) => {
    const { docName, dirName } = JSON.parse(info)
    const template: MenuItemConstructorOptions[] = [
      {
        label: "编辑此文档",
        click: () => {
          createFormDialog(windows, 'editDoc', { dirName, docName })
        }
      },
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup({window: BrowserWindow.fromWebContents(e.sender) as BrowserWindow})
  })
}

/**
 * @description 获取到目录信息的json,发给 catalog 窗口
 */
function getDocAndPost(window: BrowserView) {
  window.webContents.postMessage('getDocs', JSON.stringify(getAllDoc()))
}