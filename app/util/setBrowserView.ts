import { BrowserWindow, BrowserView } from 'electron'
/**
 * @description 根据窗口是否挂载了BrowserView 决定是set 还是add
 * @param {*} mainWindow 父窗口
 * @param {*} subWindow 子窗口view
 */
export function setBrowserView(mainWindow: BrowserWindow, subWindow: BrowserView) {
  if (mainWindow.getBrowserViews().length) {
    mainWindow.addBrowserView(subWindow)
  } else {
    mainWindow.setBrowserView(subWindow)
  }
}