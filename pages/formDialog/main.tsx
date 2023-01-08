import './index.less'
import ReactDOM from 'react-dom/client'
import React, { useState } from 'react'
import { useAllDoc, useActionInfo } from '../../src/hook'
import { ConfigProvider } from 'antd'
import EditDoc from './editDoc'
import EditDir from './editDir'
import { DirInfoProp, DorDirInfo } from '../../types/app'


const { ipcRenderer } = require('electron')

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <App />
)

type ValidateinMsg = '文档名不能为空' | '文件夹名不能为空' | '文档名重复啦' | '文件夹名称已存在' | '这名也没改啊...' | null
interface ValidateinfoProp {
  validateStatus: 'error' | null
  help: ValidateinMsg
}

function App() {
  const { dirs, allDoc } = useAllDoc()
  const { action, defaultInfo } = useActionInfo()
  const [validateinfo, setValidateinfo] = useState<ValidateinfoProp>({
    validateStatus: null,
    help: null
  })
  function close() {
    ipcRenderer.send('formDialogClose')
  }
  function onDocFinish(values: DorDirInfo) {
    const { dirName, docName } = values
    if (!docName) {
      return setValidateinfo({
        validateStatus: 'error',
        help: '文档名不能为空'
      })
    }
    if (defaultInfo.dirName === dirName && defaultInfo.docName === docName) {
      
    }
    // 判断是否有重复的文档名
    if (!dirName) {
      const rootDoc = allDoc.find(doc => doc.type === 'doc' && doc.name === docName)
      if (rootDoc) {
        return setValidateinfo({
          validateStatus: 'error',
          help: '文档名重复啦'
        })
      }
    } else {
      const { children } = allDoc.find(dir => dir.type === 'dir' && dir.name === dirName) as DirInfoProp
      const findDoc = children.find(doc => doc.name === docName)
      if (findDoc) {
        return setValidateinfo({
          validateStatus: 'error',
          help: '文档名重复啦'
        })
      }
    }   
    const postMsg = { action, dirName, docName }
    ipcRenderer.send('editDoc', JSON.stringify(postMsg))
  }
  function validateError(errMsg: ValidateinMsg) {
    setValidateinfo({
      validateStatus: 'error',
      help: errMsg
    })
  }
  function onDirFinish(values: DorDirInfo) {
    const { dirName } = values
    if (!dirName) {
      return validateError('文件夹名不能为空')
    }
    const dirs = allDoc.filter(dir => dir.type === 'dir')
    // 如果没有默认文件夹名 代表是新增文件夹 判断是否重复名
    if (!defaultInfo.dirName && dirs.find(dir => dir.name === dirName)) {
      return validateError('文件夹名称已存在')
    }
    if (defaultInfo.dirName === dirName) {
      return validateError('这名也没改啊...')
    }
    // 如果是编辑的  还能找到另一个同名的 报错
    if (dirs.find(dir => dir.name === dirName && defaultInfo.dirName !== dirName)) {
      return validateError('文件夹名称已存在')
    }
    const postMsg = { action, dirName }
    ipcRenderer.send('editDoc', JSON.stringify(postMsg))
  }
  function clearValidate() {
    setValidateinfo({ validateStatus: null, help: null })
  }
  return <ConfigProvider theme={theme()}>
    <div className='wrap'>
      {
        action === 'editDoc' && <EditDoc dirs={dirs} defaultInfo={defaultInfo} clearValidate={clearValidate} close={close} onFinish={onDocFinish} validateinfo={validateinfo} />
      }
      {
        action === 'editDir' && <EditDir defaultInfo={defaultInfo} clearValidate={clearValidate} close={close} onFinish={onDirFinish} validateinfo={validateinfo} />
      }
    </div>
  </ConfigProvider>
}

function theme() {
  return {
    token: {
      screenXS: 300,
      screenXSMax: 320,
      screenXSMin: 300,
      colorPrimary: '#845EC2'
    }
  }
}


