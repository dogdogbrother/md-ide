import React, { useState, useEffect }  from 'react'
import { observer } from 'mobx-react-lite'
import store from './store'
import classnames from 'classnames'
import { MdiLanguageMarkdown, MdiFolderDownload, MdiArrowRightThin } from '../../src/assets/svg'

function App() {
  const [unfold, setUnfold] = useState<string []>([])
  useContextMenu(store)
  const changeFolder = mune => () => {
    if (unfold.includes(mune.name)) {
      setUnfold(unfold.filter(name => name !== mune.name))
    } else setUnfold([...unfold, mune.name])
  }
  // 点击文件夹不触发此函数,文档也分文件夹下的和根目录下的
  const onCheck = (docName, menuName?) => () => {
    // 除了设置选中,还要通知渲染右侧编辑区域
    store.setCurrentMenuName(docName, menuName)
  } 
  return <div className='catalog-wrap'>
    {/* 渲染文件夹及下面的md文档 */}
    <ul>
      {store.dirMenus.filter(menu => menu.type === 'dir').map(dir => (
        <div key={dir.name}>
          <li 
            className={classnames(
              'dir',
              {'is-unfold': unfold.includes(dir.name)}
            )}
            data-dir={dir.name}
            onClick={changeFolder(dir)}
          >
            <MdiFolderDownload data-dir={dir.name} />
            <span data-dir={dir.name}>{dir.name}</span>
            {
              dir.children.length ? <MdiArrowRightThin data-dir={dir.name} className='arrow' /> : null
            }
          </li>
          {
            dir.children.map(doc => <li 
              data-dir={dir.name}
              data-doc={doc.name}
              className={classnames(
                'dir-md',
                {'is-unfold': unfold.includes(dir.name)},
                {'active': store.currentDocName === doc.name && store.currentDirName === dir.name}
              )}
              key={doc.name}
              onClick={onCheck(doc.name, dir.name)}
            >
              <MdiLanguageMarkdown data-doc={doc.name} data-dir={dir.name}/>
              <span data-doc={doc.name} data-dir={dir.name} title={doc.name}>{doc.name}</span>
            </li>)
          }
        </div>
      ))}
      {store.menus.filter(doc => doc.type !== 'dir').map(doc => (
        <li 
          data-doc={doc.name}
          key={doc.name} 
          onClick={onCheck(doc.name)}
          className={classnames(
            {'active': store.currentDocName === doc.name && !store.currentDirName}
          )}
        >
          <MdiLanguageMarkdown data-doc={doc.name}/>
          <span data-doc={doc.name} title={doc.name}>{doc.name}</span>
        </li>
      ))}
    </ul>
  </div>
}

export default observer(App)

// 右键开启菜单
function useContextMenu(store) {
  useEffect(() => {
    function handleContextMenu(e) {
      e.preventDefault()
      const { localName, dataset = {} } = e.target
      // 四种情况,右键 1.空白处 2.文档 3.文件夹 4.文件夹下的文档

      // localName 可能是li ul 和 div,都不是就是点击在空白处了
      if (localName === 'ul' || localName === 'div') {
        return store.emptyMenu()
      }
      const { doc, dir } = dataset
      // 右键文件夹 可以创建文档 可以编辑文件夹名称
      if (dir && !doc) {
        return store.editDir(doc, dir)
      }
      if (doc) {
        return store.editDoc(doc, dir)
      }
      // 右键 li 也分3种情况 双击的是文件夹还是md文档,还是文件夹下的md文档
      // // 右键文档
      // if (doc) {
      //   const docInfo = {
      //     dirName: dir,
      //     docName: doc
      //   }
      //   return store.editDoc(JSON.stringify(docInfo))
      // }
    }
    window.addEventListener('contextmenu', handleContextMenu)
  }, [])
}

