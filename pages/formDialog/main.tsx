import './index.less'
import ReactDOM from 'react-dom/client'
import React, { useState } from 'react'
import { useAllDoc } from '../../src/hook'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <App />
)

function App() {
  const {dirs, allDoc} = useAllDoc()
  return <div>
    123
  </div>
}