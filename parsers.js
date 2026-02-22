import fs from 'fs'

import path from 'path'

const getParser = (filepath) => {
  const ext = path.extname(filepath)

  switch (ext) {
    case '.json':
      return (content) => JSON.parse(content)
    default:
      throw new Error(`Unknown file format: ${ext}`)
  }
}

export const readFileData = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8')
  const parser = getParser(filepath)

  return parser(content)
}
