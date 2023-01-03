import React, { useEffect, useState }  from 'react'
import ReactDOM from 'react-dom/client'
import '../../src/assets/style/reset.css'
import '../../src/assets/style/index.css'
import './index.less'
import { MdiMinusBoxOutline, MdiCloseBoxOutline, MdiCheckboxBlankOutline, MdiCheckboxMultipleBlankOutline } from '../../src/assets/svg'
const { ipcRenderer } = require('electron')
import { useIsMaximized } from '../../src/hook'

const isMac = /macintosh|mac os x/i.test(navigator.userAgent)

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <App />
)

function App() {
  const [isMaximized, setIsMaximized] = useState(false)
  useIsMaximized(setIsMaximized)
  // 操作窗口 缩放、全屏、关闭
  const setWindow = action => () => {
    ipcRenderer.send('setWindow', action)
  }
  return <div className='title-wrap'>
    {
      isMac && <div className='mac-placeholder'> </div>
    }
    <ul className='menu'>
      <li>设置</li>
      <li>主题</li>
      <li>搜索</li>
      <li>提交</li>
    </ul>
    {
      !isMac && <div className='icon-box'>
        <MdiMinusBoxOutline onClick={setWindow('minimize')} />
        {
          isMaximized
          ?
          <MdiCheckboxMultipleBlankOutline onClick={setWindow('restore')} />
          :
          <MdiCheckboxBlankOutline onClick={setWindow('maximize')} />
        }
        <MdiCloseBoxOutline onClick={setWindow('close')}/>
      </div>
    }
  </div>
}
