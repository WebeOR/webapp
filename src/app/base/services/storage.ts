import type { Maybe } from 'src/types/scalars'

export class StorageProvider {
  protected storage: Storage

  public constructor(implementation: Storage) {
    this.storage = implementation
  }

  public set<T = any>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value))
  }

  public get<T = string>(key: string): Maybe<T> {
    const result = this.storage.getItem(key)
    if (!result || result === 'undefined')
      return undefined
    return JSON.parse(result) as T
  }

  public remove(key: string): void {
    this.storage.removeItem(key)
  }

  public clear(): void {
    this.storage.clear()
  }

  public contains(key: string): boolean {
    return !!this.storage.getItem(key)
  }
}

export const StorageService = new StorageProvider(import.meta.env.NODE_ENV === 'production' ? sessionStorage : localStorage)
export const SessionStorage = new StorageProvider(sessionStorage)
export const LocalStorage = new StorageProvider(localStorage)
