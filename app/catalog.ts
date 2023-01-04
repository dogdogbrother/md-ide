import { BrowserView, ipcMain, shell, dialog, BrowserWindow } from 'electron'
import { WindowsProp } from 'types/app'
import { setBrowserView } from './util/setBrowserView'
import loadUrl from './util/loadUrl'

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
  ipcMain.on('getDocs', () => {
    getDocAndPost(catalog)
  })
}

/**
 * @description 获取到目录信息的json,发给 catalog 窗口
 */
function getDocAndPost(window: BrowserView) {
  // window.webContents.postMessage('getDocs', JSON.stringify(getAllDoc()))
}