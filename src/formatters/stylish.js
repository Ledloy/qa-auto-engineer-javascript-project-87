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
