import path from 'path'

import fs from 'fs'

import readFileData from './parsers.js'

import getFormatter from './formatters/index.js'

export default (filepath1, filepath2, formatName = 'stylish') => {
  // 1. Читаем данные из файлов
  const data1 = readFileData(filepath1)
  const data2 = readFileData(filepath2)

  // 2. Генерируем дерево отличий
  const diffTree = generateDiff(data1, data2)

  // 3. Выбираем форматер через фабрику
  const format = getFormatter(formatName)

  // 4. Возвращаем отформатированный результат
  return format(diffTree)
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
  const allKeys = [...new Set([...keys1, ...keys2])].sort()

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
