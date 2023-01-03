import { dialog, BrowserWindow, App } from 'electron'
import { createMainWindow } from './main'
import { WindowsProp } from 'types/app'
import { setConfig } from './util/appPath'

export function createProject(app: App, windows: WindowsProp) {
  const window = new BrowserWindow({
    width: 50,
    height: 50,
    opacity: 0
  })
  showChoice(window, app, windows)
}

function showChoice(window: BrowserWindow, app: App, windows: WindowsProp) {
  const buttonInteger =  dialog.showMessageBoxSync(window, {
    message: '还没有设置文档目录哦',
    detail: '选择next-blog项目吧(没有就去下载)',
    buttons: ['打开', '取消'],
    cancelId: 1
  })
  if (buttonInteger === 0) {
    dialog.showOpenDialog(window, {
      properties: ['openDirectory']
    }).then(async res => {
      const { canceled, filePaths } = res
      // 点了取消 就返回之前的选择框
      if (canceled) {
        showChoice(window, app, windows) 
      } else {
        // 选择了文件夹,就要把文件目录path写入config.js中
        setConfig(filePaths[0])
        createMainWindow(windows, filePaths[0])
      }
    })
  }
  if (buttonInteger === 1) {
    window.close()
    app.exit()
  }
}