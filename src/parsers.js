import fs from 'fs'

import path from 'path'

import * as yaml from 'js-yaml/index.js' // ← ИСПРАВЛЕНО: явный путь

const getParser = (filepath) => {
  const ext = path.extname(filepath).slice(1)

  const parsers = {
    json: (data) => JSON.parse(data),
    yml: (data) => yaml.load(data),
    yaml: (data) => yaml.load(data),
  }

  return parsers[ext]
}

export default (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8')
  const parser = getParser(filepath)
  return parser(data)
}
