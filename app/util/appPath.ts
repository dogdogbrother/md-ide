import { app } from "electron"
import fs from 'fs'

interface ConfigJsonProp {
  md_file: string
}
type ConfigReturnProp = ConfigJsonProp | null

const userDataPath = app.getPath('userData')

const configPath = userDataPath + '/config.json'

// 获取配置信息 如果有就返回JOSN, 没有就返回 null
export function getConfig(): ConfigReturnProp {
  const isConfigExists = fs.existsSync(configPath)
  if(!isConfigExists) return null
  const configString = fs.readFileSync(configPath, 'utf-8')
  return JSON.parse(configString)
}

// 设置配置信息
export function setConfig(md_file_path: string): void {
  const json = {
    md_file: md_file_path
  }
  // 检查下项目下 有没有docs文件夹,没有的话就创建下
  if(!fs.existsSync(md_file_path + '/docs')) {
    fs.mkdirSync(md_file_path + '/docs')
  }
  fs.writeFileSync(configPath, JSON.stringify(json))
}

