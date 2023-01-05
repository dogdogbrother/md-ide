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