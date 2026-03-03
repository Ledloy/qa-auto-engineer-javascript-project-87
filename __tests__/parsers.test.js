import fs from 'fs'

import path from 'path'

import { fileURLToPath } from 'url'

import parsers from '../src/parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('parsers', () => {
  const tempDir = path.join(__dirname, '__temp__')
  beforeAll(() => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }
  })

  afterAll(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  })

  test('parses YAML file', () => {
    const filepath = path.join(tempDir, 'test.yml')
    fs.writeFileSync(filepath, 'name: test\nvalue: 123\n')

    const result = parsers(filepath)
    expect(result).toBeDefined()
    expect(typeof result).toBe('object')
    expect(result.name).toBe('test')
    expect(result.value).toBe(123)
  })

  test('throws error for unsupported format', () => {
    const filepath = path.join(tempDir, 'test.txt')
    fs.writeFileSync(filepath, 'unsupported')

    expect(() => parsers(filepath)).toThrow('Unsupported file format')
    expect(() => parsers(filepath)).toThrow('"txt"')
  })

  test('throws error when file not found', () => {
    const filepath = path.join(tempDir, 'nonexistent.json')
    expect(() => parsers(filepath)).toThrow('File not found')
  })

  test('throws error when file cannot be read', () => {
    const filepath = path.join(tempDir, 'unreadable.json')
    fs.writeFileSync(filepath, '{}')
    fs.chmodSync(filepath, '0000')

    try {
      expect(() => parsers(filepath)).toThrow('Failed to read file')
    } 
    finally {
      fs.chmodSync(filepath, '0644')
    }
  })

  test('throws error for invalid JSON', () => {
    const filepath = path.join(tempDir, 'invalid.json')
    fs.writeFileSync(filepath, '{ invalid json')

    expect(() => parsers(filepath)).toThrow('Failed to parse JSON')
  })

  test('parses JSON file successfully', () => {
    const filepath = path.join(tempDir, 'valid.json')
    fs.writeFileSync(filepath, JSON.stringify({ key: 'value' }))

    const result = parsers(filepath)
    expect(result).toBeDefined()
    expect(result.key).toBe('value')
  })
})
