import path from 'path'

import { fileURLToPath } from 'url'

import { dirname } from 'path'

import { readFileSync, existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const rootDir = dirname(__dirname)

export const getFixturePath = (filename) =>
  path.join(rootDir, '__fixtures__', filename)

export const getExpectedPath = (filename) =>
  path.join(rootDir, '__fixtures__', 'expected', filename)

export const readExpected = (filename) =>
  readFileSync(getExpectedPath(filename), 'utf8').trim()

export const checkFixturesExist = (...filenames) => {
  filenames.forEach((filename) => {
    const filepath = getFixturePath(filename)
    if (!existsSync(filepath)) {
      throw new Error(`Fixture file not found: ${filepath}`)
    }
  })
}

export const logFixturePaths = (...filenames) => {
  console.log('Fixture paths:')
  filenames.forEach((filename) => {
    const filepath = getFixturePath(filename)
    console.log(`  ${filename}: ${filepath} - exists: ${existsSync(filepath)}`)
  })
}
