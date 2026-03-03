import fs from 'fs'

import path from 'path'

import { parse } from 'yaml'

const getParser = (filepath) => {
  const ext = path.extname(filepath).slice(1).toLowerCase()

  const parsers = {
    json: data => JSON.parse(data),
    yml: data => parse(data),
    yaml: data => parse(data),
  }

  const parser = parsers[ext]

  if (!parser) {
    const supported = Object.keys(parsers).join(', ')
    throw new Error(
      `Unsupported file format: "${ext}".\nSupported formats: ${supported}`,
    )
  }

  return parser
}

export default (filepath) => {
  if (!fs.existsSync(filepath)) {
    throw new Error(`File not found: ${filepath}`)
  }

  let data
  try {
    data = fs.readFileSync(filepath, 'utf8')
  } 
  catch (error) {
    throw new Error(
      `Failed to read file: ${filepath}\nReason: ${error.message}`,
    )
  }

  const parser = getParser(filepath)
  try {
    return parser(data)
  } 
  catch (error) {
    const ext = path.extname(filepath).slice(1).toLowerCase()
    throw new Error(
      `Failed to parse ${ext.toUpperCase()} file: ${filepath}\n`
      + `Reason: ${error.message}\n`
      + `Hint: Check the file syntax is valid ${ext.toUpperCase()}`,
    )
  }
}
