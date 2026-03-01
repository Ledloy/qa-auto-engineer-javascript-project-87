import readFileData from './parsers.js'

import getFormatter from './formatters/index.js'

import { STATUS } from './constants.js'

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFileData(filepath1)
  const data2 = readFileData(filepath2)
  const diffTree = generateDiff(data1, data2)
  const format = getFormatter(formatName)
  return format(diffTree)
}

const generateDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = [...new Set([...keys1, ...keys2])].sort((a, b) =>
    a.localeCompare(b),
  )

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
        status: STATUS.CHANGED,
      }
    }

    return { key, value: data1[key], status: STATUS.UNCHANGED }
  })
}
