
import stylish from '../src/formatters/stylish.js'

import { STATUS } from '../src/constants.js'

describe('stylish formatter', () => {
  test('formats ADDED status', () => {
    const diff = [
      { key: 'setting1', value: 'Value 1', status: STATUS.ADDED }
    ]
    const result = stylish(diff)
    expect(result).toContain('+ setting1: Value 1')
  })

  test('formats REMOVED status', () => {
    const diff = [
      { key: 'setting2', value: '200', status: STATUS.REMOVED }
    ]
    const result = stylish(diff)
    expect(result).toContain('- setting2: 200')
  })

  test('formats CHANGED status', () => {
    const diff = [
      {
        key: 'setting3',
        value1: 'true',
        value2: 'false',
        status: STATUS.CHANGED
      }
    ]
    const result = stylish(diff)
    expect(result).toContain('- setting3: true')
    expect(result).toContain('+ setting3: false')
  })

  test('formats UNCHANGED status', () => {
    const diff = [
      { key: 'setting4', value: 'blah blah', status: STATUS.UNCHANGED }
    ]
    const result = stylish(diff)
    expect(result).toContain('setting4: blah blah')
  })

  test('formats object as [complex value]', () => {
    const diff = [
      {
        key: 'setting5',
        value: { key5: 'value5' },
        status: STATUS.ADDED
      }
    ]
    const result = stylish(diff)
    expect(result).toContain('+ setting5: [complex value]')
  })

  test('formats nested object as [complex value]', () => {
    const diff = [
      {
        key: 'nested',
        value1: 'old',
        value2: { inner: { deep: 'value' } },
        status: STATUS.CHANGED
      }
    ]
    const result = stylish(diff)
    expect(result).toContain('+ nested: [complex value]')
  })

  test('formats multiple changes', () => {
    const diff = [
      { key: 'a', value: '1', status: STATUS.ADDED },
      { key: 'b', value: '2', status: STATUS.REMOVED },
      { key: 'c', value: '3', status: STATUS.UNCHANGED }
    ]
    const result = stylish(diff)
    expect(result).toContain('{')
    expect(result).toContain('}')
  })

  test('formats empty diff', () => {
    const result = stylish([])
    expect(result).toBe('{\n\n}')
  })
})
