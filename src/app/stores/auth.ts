import { decodeJwt } from '@shared/utils/strings'

import { authorization } from '@app/base/services'
import { authProvider } from '@app/providers/auth'

import type { MaybeNullable } from 'src/types/scalars'
import type { ModuleCallResult } from 'src/types/utils'

interface State {
  user: any
}

export const useAuthStore = defineStore('auth', () => {
  const state = reactive<State>({
    user: {},
  })

  async function loadUserData(token: string = authorization.getToken()): Promise<boolean> {
    if (!token)
      return false

    const { isFailed, data } = await authProvider.getCurrentUser()

    console.log({ data, isFailed })

    if (!isFailed)
      setUser(data)

    state.user.username = decodeJwt(authorization.getToken()).sub

    return !authorization.isLoggedIn()
  }

  async function processSignIn(username: string, password: string): Promise<ModuleCallResult> {
    const { isFailed, data } = await authProvider.signIn({ password, username })

    if (!data || isFailed) {
      return {
        isFailed: true,
        messages: ['auth.failed'],
      }
    }

    authorization.setToken(data.accessToken)
    authorization.setRefreshToken(data.refreshToken)

    loadUserData(data.accessToken)

    return {
      isFailed: false,
      messages: ['login.success'],
    }
  }

  function processSignOut(): void {
    authorization.processSignOut()
  }

  function setUser(v: MaybeNullable<any>): void {
    if (!v)
      return
    state.user = v
  }

  return {
    ...toRefs(state),

    loadUserData,
    processSignIn,
    processSignOut,
    setUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
