import { Button, Form, Input } from 'antd'
import React from 'react'

function EditDoc(props) {
  const { validateinfo, close, onFinish, defaultInfo, clearValidate } = props
  return <Form 
    name='editDoc'
    labelCol={{ span: 5 }}
    wrapperCol={{ span: 19 }}
    labelAlign="left"
    onFinish={onFinish}
    colon={false}
  >
    <Form.Item 
      label='文件夹名'
      name='dirName' 
      validateStatus={validateinfo.validateStatus} 
      help={validateinfo.help}
      initialValue={defaultInfo.dirName || ''}
    >
      <Input onInput={clearValidate}/>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 5, span: 19 }} style={{ marginBottom: '0px' }}>
      <div className='btn-wrap'>
        <Button onClick={close}>取消</Button>
        <Button type='primary' htmlType='submit'>确定</Button>
      </div>
    </Form.Item>
  </Form>
}

export default EditDoc