export function parseJSONRecursively(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(item => parseJSONRecursively(item))
  } else if (typeof obj === 'object' && obj !== null) {
    const record = obj as Record<string, unknown>
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(record)) {
      out[key] = parseJSONRecursively(record[key])
    }
    return out
  } else if (typeof obj === 'string') {
    try {
      return parseJSONRecursively(JSON.parse(obj))
    } catch (e) {
      return obj
    }
  }
  return obj
}
