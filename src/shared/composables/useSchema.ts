import { UiError } from '../utils/errors'

const menuSchema = () => import('src/schemas/menu.json')

const availableSchemasList = [
  'menu',
]

const cache: Record<string, any> = {}

export async function useSchema(key: string): Promise<any> {
  try {
    if (!availableSchemasList.includes(key))
      throw new Error(`schema '${key}' not found!`)

    if (cache[key]) {
      if (import.meta.env.DEV)
        console.log('use pre-cached schema:', key)
      return cache[key]
    }

    if (import.meta.env.DEV)
      console.log('try to load schema:', key)

    let loader: () => Promise<any> = () => Promise.resolve()

    switch (key) {
      case 'menu':
        loader = menuSchema
        break

      default:
        loader = menuSchema
        break
    }

    if (import.meta.env.DEV)
      console.log('schema', key, 'loaded')

    cache[key] = await loader().then(r => r.default as any)
    return cache[key]
  }
  catch (error: any) {
    throw new UiError(
      error,
      { key },
    )
  }
}
