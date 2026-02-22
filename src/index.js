import fs from 'fs'

import path from 'path'

import sortBy from 'lodash/sortBy.js'

const getParser = (filepath) => {
  const ext = path.extname(filepath)
  if (ext === '.json') {
    return (content) => JSON.parse(content)
  }
  throw new Error(`Unknown format: ${ext}`)
}

const readData = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8')
  const parser = getParser(filepath)
  return parser(content)
}

const STATUS = {
  ADDED: 'added',
  REMOVED: 'removed',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
}

const generateDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = sortBy([...new Set([...keys1, ...keys2])])

  return allKeys.map((key) => {
    const has1 = Object.hasOwn(data1, key)
    const has2 = Object.hasOwn(data2, key)

    if (!has2) {
      return { key, value: data1[key], status: STATUS.REMOVED }
    }
    if (!has1) {
      return { key, value: data2[key], status: STATUS.ADDED }
    }
    if (data1[key] !== data2[key]) {
      return {
        key,
        value1: data1[key],
        value2: data2[key],
        status: STATUS.CHANGED
      }
    }
    return { key, value: data1[key], status: STATUS.UNCHANGED }
  })
}

const formatValue = (value) => {
  if (value === null) {
    return 'null'
  }
  if (value === undefined) {
    return 'undefined'
  }
  if (typeof value === 'object') {
    return '[complex value]'
  }
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'number') {
    return value
  }
  return `'${String(value)}'`
}

const renderStylish = (diff) => {
  const lines = diff.map((node) => {
    const { key, status } = node

    if (status === STATUS.ADDED) {
      return `  + ${key}: ${formatValue(node.value)}`
    }
    if (status === STATUS.REMOVED) {
      return `  - ${key}: ${formatValue(node.value)}`
    }
    if (status === STATUS.CHANGED) {
      const line1 = `  - ${key}: ${formatValue(node.value1)}`
      const line2 = `  + ${key}: ${formatValue(node.value2)}`
      return `${line1}\n${line2}`
    }
    return `    ${key}: ${formatValue(node.value)}`
  })

  return `{\n${lines.join('\n')}\n}`
}

export default (filepath1, filepath2) => {
  const data1 = readData(filepath1)
  const data2 = readData(filepath2)

  const diffTree = generateDiff(data1, data2)
  return renderStylish(diffTree)
}
