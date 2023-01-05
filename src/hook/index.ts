import { useEffect, useState } from 'react'
import { IpcRendererEvent } from 'electron'
import { FileInfoProp } from '../../types/app'
const { ipcRenderer } = require('electron')

/**
 * @description 去获取是否是全面屏 ps:只在Windows上有作用
 */
export function useIsMaximized(setIsMaximized: Function) {
  useEffect(() => {
    ipcRenderer.send('isMaximized')
    ipcRenderer.on('isMaximized', (_e, state) => {
      setIsMaximized(state)
    })
  }, [])
}

/**
 * @description 去获取全部的文档信息,是因为保存文件名时校验下 防止重复了,
 */
export function useAllDoc() {
  // 装着dirName的数字,用于渲染目录的select
  const [dirs, setDirs] = useState<string []>([])
  // 记录原始的文档列表,用于校验文件名是否重复
  const [allDoc, setAllDoc] = useState<FileInfoProp []>([]) 
  useEffect(() => {
    ipcRenderer.send('getAllDoc')
    ipcRenderer.on('getAllDoc', (_e, allDoc) => {
      const _allDoc = JSON.parse(allDoc) as FileInfoProp[]
      setDirs(_allDoc.filter(doc => doc.type === 'dir').map(doc => doc.name))
      setAllDoc(_allDoc)
    })
  }, [])
  return { dirs, allDoc }
}

/**
 * @description 去获取全部的文档信息,是因为保存文件名时校验下 防止重复了,
 */
export function useActionInfo() {

}

