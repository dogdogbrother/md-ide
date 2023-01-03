import isDev from 'electron-is-dev'
import path from 'path'
import { BrowserWindow, BrowserView } from 'electron'

export default function loadUrl(window: BrowserWindow | BrowserView, route = '') {
  if (isDev) {
    window.webContents.loadURL(`http://localhost:5500${route}`)
  } else {
    window.webContents.loadURL(`file://${path.resolve(__dirname, '../_dist/' + (route || 'index.html'))}`)
  }
} 