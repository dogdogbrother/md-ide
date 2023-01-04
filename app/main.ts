import { app, BrowserWindow } from 'electron'
import loadUrl from './util/loadUrl'
import { getConfig } from './util/appPath'
import { WindowsProp } from 'types/app'
import { createTitle } from './title'
import { createCatalog } from './catalog'

const windows: WindowsProp = {} 

app.on('ready', async () => {
  const config = getConfig()
  // 存在配置文件就打开主窗口,没有的话 就让用户选择笔记项目的文件夹
  if (config) {
    createMainWindow(windows, config.md_file)
  } else {
    const { createProject } = await import('./createProject')
    createProject(app, windows)
  }
})

export function createMainWindow(windows: WindowsProp, md_file: string) {
  windows.main = new BrowserWindow({
    width: 1280,
    height: 930,
    useContentSize: true,
    show: false,
    frame: false,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: {
      x: 20,
      y: 6
    },
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  loadUrl(windows.main)
  windows.main.once('ready-to-show', () => {
    windows.main?.show()
    createTitle(windows)
    createCatalog(windows, md_file)
  })
}