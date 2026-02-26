import fs from 'fs'

import { test, expect } from '@jest/globals'

import { getFixturePath } from './testUtils.js'

import genDiff from '../src/index.js'

const expectedStylish = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

const expectedPlain = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`

test('stylish formatter', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  expect(fs.existsSync(filepath1)).toBe(true)
  expect(fs.existsSync(filepath2)).toBe(true)

  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish)
})

test('plain formatter', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  expect(fs.existsSync(filepath1)).toBe(true)
  expect(fs.existsSync(filepath2)).toBe(true)

  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain)
})

test('json formatter', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  expect(fs.existsSync(filepath1)).toBe(true)
  expect(fs.existsSync(filepath2)).toBe(true)

  const result = genDiff(filepath1, filepath2, 'json')
  const parsed = JSON.parse(result)

  expect(parsed).toBeInstanceOf(Array)
  expect(parsed.length).toBeGreaterThan(0)
  expect(result).toContain('"status": "removed"')
  expect(result).toContain('"status": "added"')
  expect(result).toContain('"status": "changed"')
})

test('default format (stylish)', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish)
})
