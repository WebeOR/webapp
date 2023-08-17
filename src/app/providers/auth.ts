import { BaseRestProvider } from '@shared/api/http'
import type { ErrorData, ProviderResult } from '@shared/api/http'
import type { AuthResult, AuthSignInPayload, AuthSignUpPayload } from './auth.models'

import {
  onApiRequestFulfilled,
  onApiResponseFulfilled,
  onApiResponseRejected,
} from './domain/interceptors'

class AuthProvider extends BaseRestProvider {
  public constructor() {
    super(
      '/api/auth',
      onApiRequestFulfilled,
      undefined,
      onApiResponseFulfilled,
      onApiResponseRejected,
    )
  }

  public async signIn(payload: AuthSignInPayload): Promise<ProviderResult<AuthResult>> {
    try {
      const { data, status } = await this.post<AuthResult>('login', payload)
      return { data, isFailed: status !== 200 }
    }
    catch (error) {
      const err = error as ErrorData
      console.log('signIn :>>', err.message)
      return {
        isFailed: true,
        messages: [
          err.message,
        ],
      }
    }
  }

  public async signUp(payload: AuthSignUpPayload): Promise<ProviderResult<AuthResult>> {
    try {
      const { data, status } = await this.post<AuthResult>('register', payload)
      return { data, isFailed: status !== 200 }
    }
    catch (error) {
      const err = error as ErrorData
      console.log('signUp :>>', err.message)
      return {
        isFailed: true,
        messages: [
          err.message,
        ],
      }
    }
  }

  public async refreshToken(): Promise<ProviderResult<AuthResult>> {
    try {
      const { data, status } = await this.post<AuthResult>('refresh-token')
      return { data, isFailed: status !== 200 }
    }
    catch (error) {
      const err = error as ErrorData
      console.log('refreshToken :>>', err.message)
      return {
        isFailed: true,
        messages: [
          err.message,
        ],
      }
    }
  }

  public async getCurrentUser(): Promise<ProviderResult<AuthResult>> {
    try {
      const { data, status } = await this.post<AuthResult>('refresh-token')
      return { data, isFailed: status !== 200 }
    }
    catch (error) {
      const err = error as ErrorData
      console.log('refreshToken :>>', err.message)
      return {
        isFailed: true,
        messages: [
          err.message,
        ],
      }
    }
  }
}

export const authProvider = new AuthProvider()
