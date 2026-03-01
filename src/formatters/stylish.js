import { STATUS } from '../constants.js'

export default (diff) => {
  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return '[complex value]'
    }
    return String(value)
  }

  const lines = diff
    .map((item) => {
      switch (item.status) {
        case STATUS.ADDED:
          return `  + ${item.key}: ${formatValue(item.value)}`
        case STATUS.REMOVED:
          return `  - ${item.key}: ${formatValue(item.value)}`
        case STATUS.CHANGED:
          return `  - ${item.key}: ${formatValue(item.value1)}\n  + ${item.key}: ${formatValue(item.value2)}`
        case STATUS.UNCHANGED:
          return `    ${item.key}: ${formatValue(item.value)}`
        default:
          return ''
      }
    })
    .filter((line) => line !== '')
    .join('\n')

  return `{\n${lines}\n}`
}
