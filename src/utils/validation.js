export const validateFieldName = (name) => {
    const errors = []
    if (name.length > 10) {
      errors.push('Field name must be 10 characters or less')
    }
    if (!/^[A-Za-z0-9_]*$/.test(name)) {
      errors.push('Field name can only contain letters, numbers, and underscores')
    }
    return errors
  }
  
  export const validateAliases = (aliases) => {
    if (!aliases) return null
  
    const lines = aliases.split('\n').filter(line => line.trim())
    const keys = new Set()
    const lowercaseKeys = new Set()
  
    for (const line of lines) {
      if (!line.startsWith('@')) {
        return 'Each line must start with @'
      }
  
      const [keyPart, ...valueParts] = line.substring(1).split('=')
      const key = keyPart.trim()
      const value = valueParts.join('=').trim()
      
      if (!key || !value) {
        return 'Each line must be in format @key=value'
      }
  
      const specialCharsRegex = /[^a-zA-Z0-9_]/
      if (specialCharsRegex.test(key) || specialCharsRegex.test(value)) {
        return 'Keys and values can only contain letters, numbers, and underscores'
      }
  
      if (keys.has(key)) {
        return `Duplicate key found: ${key}`
      }
      keys.add(key)
  
      const lowercaseKey = key.toLowerCase()
      if (lowercaseKeys.has(lowercaseKey) && !keys.has(key)) {
        return `Case-insensitive duplicate key found: ${key}`
      }
      lowercaseKeys.add(lowercaseKey)
    }
  
    return null
  }