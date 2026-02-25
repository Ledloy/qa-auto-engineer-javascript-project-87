import fs from 'fs'

import path from 'path'

import yaml from 'js-yaml'

const getParser = (filepath) => {
  const ext = path.extname(filepath)

  switch (ext) {
    case '.json':
      return (content) => JSON.parse(content)
    case '.yml':
    case '.yaml':
      return (content) => yaml.load(content)
    default:
      throw new Error(`Unknown file format: ${ext}`)
  }
}

export const readFileData = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8')
  const parser = getParser(filepath)
  return parser(content)
}

export default readFileData
