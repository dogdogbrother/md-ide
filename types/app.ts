import { BrowserWindow, BrowserView } from 'electron'

export interface WindowsProp {
  main?: BrowserWindow,
  title?: BrowserView,
  catalog?: BrowserView,
  formDialog?: BrowserWindow
} 

export interface DirInfoProp {
  type: 'dir'
  name: string
  children: DocInfoProp[]
}

export interface DocInfoProp {
  type: 'dir' | 'doc'
  name: string
}

export type FileInfoProp = DirInfoProp | DocInfoProp

export type FormDialogAction = 'editDoc' | 'editDir'

export interface DorDirInfo {
  dirName?: string
  docName?: string
  preDirName?: string  // 未编辑前的文件夹名
  preDocName?: string
}
export interface ActionInfoProp extends DorDirInfo {
  action: FormDialogAction
}