import { BrowserWindow, BrowserView } from 'electron'

export interface WindowsProp {
  main?: BrowserWindow,
  title?: BrowserView,
  catalog?: BrowserView,
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