import { getDocPath } from './appPath'
import fs from 'fs'
import { DirInfoProp, FileInfoProp, DocInfoProp } from 'types/app'

/**
 * @description 会返回个二维数组
 */
export function getAllDoc() {
  const _dir: FileInfoProp[] = []
  console.log(_getDir());
  _getDir().forEach(dir => {
    const fullPath = getDocPath(dir)
    const stats = fs.statSync(fullPath)
    // 判断下 必须是文件夹
    if (!stats.isFile()) {
      const files = fs.readdirSync(fullPath)
      const dcos = files.filter(file => file.includes('.md')).map(_getDocFn)
      _dir.push({
        type: 'dir',
        name: dir,
        children: dcos
      })
    }
  })
  return [..._dir, ..._getRootDocs()]
}

// 获取到全部的文件夹
function _getDir() {
  const docsDir = fs.readdirSync(getDocPath())
  // 暂时判定 没有 .md 的都是文件夹  并且排除img文件夹
  return docsDir.filter(file => !file.includes('.md') && file !== 'img')
}

// 最终生成文档对象的回调方法
const _getDocFn = (file: string): DocInfoProp | DirInfoProp => {
  return {
    type: 'doc',
    name: file.split('.md')[0]
  }
}

// 获取到根目录下的所有 .md 文件
function _getRootDocs() {
  const docs = fs.readdirSync(getDocPath())
  return docs.filter(file => file.includes('.md')).map(_getDocFn)
}