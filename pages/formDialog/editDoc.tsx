import { Button, Form, Input, Select } from 'antd'
import React from 'react'

function EditDoc(props) {
  const { dirs, validateinfo, close, onFinish, defaultInfo, clearValidate } = props
  return <Form 
    name='editDoc'
    labelCol={{ span: 5 }}
    wrapperCol={{ span: 19 }}
    labelAlign="left"
    onFinish={onFinish}
    colon={false}
  >
    <Form.Item label='目录' name='dirName' initialValue={defaultInfo.dirName || undefined}>
      <Select 
        defaultValue={defaultInfo.dirName || ''}
        options={[
          { value: '', label: '根目录'},
          ...dirs.map(dir => ({ value: dir, label: dir }))
        ]}
      ></Select>
    </Form.Item>
    <Form.Item 
      label='文档名称'
      name='docName' 
      validateStatus={validateinfo.validateStatus} 
      help={validateinfo.help}
      initialValue={defaultInfo.docName || ''}
    >
      <Input addonAfter=".md" onInput={clearValidate}/>
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