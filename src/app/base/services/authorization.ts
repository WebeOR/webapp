import type { StorageProvider } from './storage'
import { LocalStorage, SessionStorage } from './storage'

const TOKEN_KEY = 'TOKEN'
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'

class Auth {
  private localStorageProvider: StorageProvider

  private sessionStorageProvider: StorageProvider

  private accessToken: string

  private refreshToken: string

  public constructor() {
    this.localStorageProvider = LocalStorage
    this.sessionStorageProvider = SessionStorage
    this.accessToken = this.sessionStorageProvider.get<string>(TOKEN_KEY) ?? ''
    this.refreshToken = this.localStorageProvider.get<string>(REFRESH_TOKEN_KEY) ?? ''
  }

  public isUserAdmin(): boolean {
    const roles = this.localStorageProvider.get<string[]>('ROLES')
    return !!(roles?.includes('ADMIN'))
  }

  public setRoles(v: string[]): void {
    this.localStorageProvider.set<string[]>('ROLES', v)
  }

  /**
   * isLoggedIn
   */
  public isLoggedIn(): boolean {
    return this.sessionStorageProvider.contains(TOKEN_KEY)
  }

  /**
   * getToken
   */
  public getToken(): string {
    return this.accessToken || (this.sessionStorageProvider.get<string>(TOKEN_KEY) ?? '')
  }

  /**
   * setToken
   */
  public setToken(value: string): void {
    return this.sessionStorageProvider.set(TOKEN_KEY, value)
  }

  /**
   * getRefreshToken
   */
  public getRefreshToken(): string {
    return this.localStorageProvider.get(REFRESH_TOKEN_KEY) || this.refreshToken
  }

  /**
   * setToken
   */
  public setRefreshToken(value: string): void {
    this.refreshToken = value
    return this.localStorageProvider.set(REFRESH_TOKEN_KEY, value)
  }

  /**
   * processSignOut
   */
  public processSignOut(): void {
    this.accessToken = ''
    this.refreshToken = ''
    this.sessionStorageProvider.clear()
    this.localStorageProvider.clear()
    if (import.meta.env.NODE_ENV === 'production')
      console.clear()
  }

  /**
   * dispose
   */
  public dispose(): void {
    this.processSignOut()
  }
}

export const authorization = new Auth()
