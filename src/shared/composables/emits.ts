import type { BasePromiseEvent } from 'src/types/utils'

export function useAsyncEmit<P extends Record<string, any>, T>(emit: (event: string | any, ...args: any[]) => void, name: string, payload: P): Promise<T> {
  return new Promise<T>((resolve, reject): void => {
    const value: P & BasePromiseEvent<T> = {
      ...payload,
      reject,
      resolve,
    }
    emit(name, value)
  })
}
