import { setupLayouts } from 'virtual:generated-layouts'
import {
  type NavigationGuardWithThis,
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from 'vue-router'

import { AuthRoutes } from '@app/scopes/Auth'

import type { UserPlugin } from 'src/types'

import { authorization } from '../services'

const scopesRoutesRecord = import.meta.glob<{ default: RouteRecordRaw[] }>('../../scopes/*/routes.ts', { eager: true })

const scopesRoutes = Object
  .values(scopesRoutesRecord)
  .map(v => v.default)
  .flat()

const checkAuth: NavigationGuardWithThis<undefined> = ({ matched, name, fullPath, redirectedFrom }, _, next) => {
  const isLoggedIn = authorization.isLoggedIn()

  if (name?.toString().startsWith('Auth') && isLoggedIn)
    return next({ path: '/dashboard' })

  const hasAnonymous = matched.some(record => record.meta.allowAnonymous)

  // этот флаг разрешает отсутствие авторизации,
  if (hasAnonymous)
    return next()

  // проверяем есть ли токен, и если нет,
  // перенаправляем на страницу логина
  if (!isLoggedIn) {
    authorization.dispose()
    return next({
      name: AuthRoutes.signIn,
      query: { redirect: fullPath },
    })
  }

  return next()
}

const routes: RouteRecordRaw[] = [
  ...scopesRoutes,
]

const generatedRoutes = setupLayouts(routes)

// Setup Router
export const install: UserPlugin = (app) => {
  const router = createRouter({
    history: createWebHistory(),
    routes: generatedRoutes,
  })

  router.beforeResolve(checkAuth)

  app.use(router)
}
