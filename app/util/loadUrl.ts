import isDev from 'electron-is-dev'
import path from 'path'
import { BrowserWindow } from 'electron'

export default function loadUrl(window: BrowserWindow, route = '') {
  if (isDev) {
    window.loadURL(`http://localhost:5500${route}`)
  } else {
    window.loadURL(`file://${path.resolve(__dirname, '../../_dist/' + route)}`)
  }
} 