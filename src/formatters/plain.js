import { STATUS } from '../constants.js'

import { formatValue } from '../utils/formatValue.js'

export default (diff) => {
  return diff
    .map((item) => {
      switch (item.status) {
        case STATUS.ADDED:
          return `Property '${item.key}' was added with value: ${formatValue(item.value)}`
        case STATUS.REMOVED:
          return `Property '${item.key}' was removed`
        case STATUS.CHANGED:
          return `Property '${item.key}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`
        default:
          return ''
      }
    })
    .filter(line => line !== '')
    .join('\n')
}
