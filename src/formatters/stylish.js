import { STATUS } from '../constants.js'

import { formatValue } from '../utils/formatValue.js'

export default (diff) => {
  return diff
    .map((item) => {
      switch (item.status) {
        case STATUS.ADDED:
          return `  + ${item.key}: ${formatValue(item.value)}`
        case STATUS.REMOVED:
          return `  - ${item.key}: ${formatValue(item.value)}`
        case STATUS.CHANGED:
          return `  - ${item.key}: ${formatValue(item.value1)}\n  + ${item.key}: ${formatValue(item.value2)}`
        default:
          return ''
      }
    })
    .filter((line) => line !== '')
    .join('\n')
}
