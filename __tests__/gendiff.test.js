import { test, expect } from '@jest/globals'

import { getFixturePath } from './testUtils.js'

import genDiff from '../src/index.js'

import fs from 'fs'

const expectedStylish = `{
  - follow: false
    host: 'hexlet.io'
  - proxy: '123.234.53.22'
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

test('stylish formatter', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  expect(fs.existsSync(filepath1)).toBe(true)
  expect(fs.existsSync(filepath2)).toBe(true)

  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish)
})
