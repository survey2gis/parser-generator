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
  const lowercaseKeys = new Set()

  for (const line of lines) {
    if (!line.startsWith('@')) {
      return 'Each line must start with @'
    }

    // Find the first = sign to split key and value
    const equalIndex = line.indexOf('=')
    if (equalIndex === -1) {
      return 'Each line must be in format @key=value'
    }

    // Extract key and value, allowing spaces around =
    const keyPart = line.substring(1, equalIndex).trim()
    const value = line.substring(equalIndex + 1).trim()
    
    if (!keyPart || !value) {
      return 'Each line must be in format @key=value'
    }

    // Check requirement: "no whitespace between @ and old"
    const keyWithoutTrim = line.substring(1, equalIndex)
    if (keyWithoutTrim.startsWith(' ') || keyWithoutTrim.startsWith('\t')) {
      return 'There must be no whitespace between @ and the key'
    }

    // Check value length requirement (254 ASCII characters max)
    if (value.length > 254) {
      return 'Replacement text must not be longer than 254 characters'
    }

    // Check for duplicate keys (case insensitive as per requirements)
    const lowercaseKey = keyPart.toLowerCase()
    if (lowercaseKeys.has(lowercaseKey)) {
      return `Duplicate key found: ${keyPart}`
    }
    lowercaseKeys.add(lowercaseKey)
  }

  return null
}