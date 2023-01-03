import { useEffect } from 'react'
const { ipcRenderer } = require('electron')

/**
 * @description 去获取是否是全面屏 ps:只在Windows上有作用
 */
export function useIsMaximized(setIsMaximized: Function) {
  useEffect(() => {
    // 去获取是否是全面屏 ps:只在Windows上有作用
    ipcRenderer.send('isMaximized')
    ipcRenderer.on('isMaximized', (_e, state) => {
      setIsMaximized(state)
    })
  }, [])
}