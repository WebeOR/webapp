export function convertListToMap(src: Array<Record<string, any>>, k: string, v: string): Record<string, any> {
  return src.reduce<Record<string, string>>((acc, cur) => {
    const key = cur[k]
    const val = cur[v]
    acc[key] = val
    return acc
  }, {})
}

export function convertMapToList(src: Record<string, any>, k: string, v: string): Array<Record<string, any>> {
  const result: Array<Record<string, any>> = []

  for (const key in src) {
    if (Object.prototype.hasOwnProperty.call(src, key)) {
      const val = src[key]
      result.push({
        [k]: key,
        [v]: val,
      })
    }
  }

  return result
}

export function removeDuplicates<T = any>(array: T[]): T[] {
  return Array.from(new Set(array))
}

export function removeKeys<T = Record<string, any>>(object: unknown, exclude: string[]): T {
  return JSON.parse(JSON.stringify(object, (k, v) => ((exclude.includes(k)) ? undefined : v)))
}

export function copy<T = any>(v: any): T {
  return JSON.parse(JSON.stringify(v))
}
