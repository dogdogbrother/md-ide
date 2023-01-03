import { BrowserView, ipcMain, BrowserWindow } from 'electron'
import loadUrl from './util/loadUrl'
import { WindowsProp } from 'types/app'
import { setBrowserView } from './util/setBrowserView'

export function createTitle(windows: WindowsProp) {
  windows.title = new BrowserView({
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  setBrowserView(windows.main as BrowserWindow, windows.title)
  windows.title.setAutoResize({ width: true })
  windows.title.setBounds({ x: 0, y: 0, width: 1280, height: 30 })
  loadUrl(windows.title, '/pages/title/index.html')
  // windows.title.webContents.openDevTools()
  ipcMain.once('isMaximized', () => {
    windows.title?.webContents.postMessage('isMaximized', windows.main?.isMaximized())
  })
}