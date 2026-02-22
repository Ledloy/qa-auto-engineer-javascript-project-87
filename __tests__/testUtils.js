import path from 'path'

import { fileURLToPath } from 'url'

import { dirname } from 'path'

import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const rootDir = dirname(__dirname)

export const getFixturePath = (filename) =>
  path.join(rootDir, '__fixtures__', filename)

export const checkFixturesExist = (...filenames) => {
  filenames.forEach(filename => {
    const path = getFixturePath(filename)
    if (!fs.existsSync(path)) {
      throw new Error(`Fixture file not found: ${path}`)
    }
  })
}

export const logFixturePaths = (...filenames) => {
  console.log('Fixture paths:')
  filenames.forEach(filename => {
    const path = getFixturePath(filename)
    console.log(`  ${filename}: ${path} - exists: ${fs.existsSync(path)}`)
  })
}
