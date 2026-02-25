const STATUS = {
  ADDED: 'added',
  REMOVED: 'removed',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
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

export default (diff) => {
  const lines = diff.map((node) => {
    const { key, status } = node

    if (status === STATUS.ADDED) {
      return `Property '${key}' was added with value: ${formatValue(node.value)}`
    }
    if (status === STATUS.REMOVED) {
      return `Property '${key}' was removed`
    }
    if (status === STATUS.CHANGED) {
      return `Property '${key}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`
    }
    return ''
  })

  return lines.filter((line) => line !== '').join('\n')
}
