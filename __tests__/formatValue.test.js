
import { formatValue, isObject } from '../src/utils/formatValue.js'

describe('formatValue', () => {
  test('returns string for strings', () => {
    expect(formatValue('hello')).toBe('hello')
  })

  test('returns string for numbers', () => {
    expect(formatValue(42)).toBe('42')
    expect(formatValue(0)).toBe('0')
  })

  test('returns string for booleans', () => {
    expect(formatValue(true)).toBe('true')
    expect(formatValue(false)).toBe('false')
  })

  test('returns "null" for null', () => {
    expect(formatValue(null)).toBe('null')
  })

  test('returns string for undefined', () => {
    expect(formatValue(undefined)).toBe('undefined')
  })

  test('returns "[complex value]" for objects', () => {
    expect(formatValue({})).toBe('[complex value]')
    expect(formatValue({ key: 'value' })).toBe('[complex value]')
  })

  test('returns "[complex value]" for arrays', () => {
    expect(formatValue([])).toBe('[complex value]')
    expect(formatValue([1, 2, 3])).toBe('[complex value]')
  })
})

describe('isObject', () => {
  test('returns true for plain objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ key: 'value' })).toBe(true)
  })

  test('returns false for null', () => {
    expect(isObject(null)).toBe(false)
  })

  test('returns false for primitives', () => {
    expect(isObject('string')).toBe(false)
    expect(isObject(42)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
})
