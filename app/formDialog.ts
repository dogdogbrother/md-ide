import { BrowserWindow, ipcMain } from 'electron'
import { WindowsProp, FormDialogAction } from 'types/app'
import { getAllDoc } from './util/doc'
import loadUrl from './util/loadUrl'

export function createFormDialog(windows: WindowsProp, action: FormDialogAction ) {
  windows.formDialog = new BrowserWindow({
    parent: windows.main,
    modal: true,
    width: 360,
    // 180 125 150
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
}