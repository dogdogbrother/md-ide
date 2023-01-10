import { makeAutoObservable } from "mobx"
const { ipcRenderer } = require('electron')
import { FileInfoProp, DirInfoProp, DocInfoProp } from '../../types/app'
class CatalogStore {
  menus: FileInfoProp[] = []
  dirMenus: DirInfoProp[] = [] 
  docMenus: DocInfoProp[] = []
  currentDirName: ''
  currentDocName: ''  
  constructor() {
    makeAutoObservable(this)
    ipcRenderer.send('getDocs')
    ipcRenderer.on('getDocs', (_, menus) => {
      this.setMenus(JSON.parse(menus))
    })
  }
  setMenus(menus) {
    this.menus = menus
    this.dirMenus = menus.filter(menu => menu.type === 'dir')
    this.docMenus = menus.filter(menu => menu.type === 'doc')
  }
  setCurrentMenuName(docName, dirName) {
    this.currentDocName = docName
    this.currentDirName = dirName
  }
  emptyMenu() {
    ipcRenderer.send('emptyMenu')
  }
  editDir(docName, dirName) {
    ipcRenderer.send('editMune', JSON.stringify({docName, dirName}))
  }
  editDoc(docName, dirName) {
    ipcRenderer.send('editMenuDoc', JSON.stringify({docName, dirName}))
  }
}

export default new CatalogStore()