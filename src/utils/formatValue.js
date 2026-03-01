export const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  return typeof value === 'string' ? `'${value}'` : String(value)
}

export const isObject = (value) =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
