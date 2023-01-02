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

