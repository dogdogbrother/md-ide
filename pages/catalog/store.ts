import { makeAutoObservable } from "mobx"
const { ipcRenderer } = require('electron')

class CatalogStore {
  menus = []
  constructor() {
    makeAutoObservable(this)
    ipcRenderer.send('getDocs')
    ipcRenderer.on('getDocs', (_, menus) => {
      this.setMenus(JSON.parse(menus))
    })
  }
  setMenus(menus) {
    console.log(menus)
    this.menus = menus
  }
}

export default new CatalogStore()