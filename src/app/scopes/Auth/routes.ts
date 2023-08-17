import type { RouteRecordRaw } from 'vue-router'

const SignInView = () => import('./views/SignInView.vue')
const SignUpView = () => import('./views/SignUpView.vue')

export enum AuthRoutes {
  signIn = 'Auth/signIn',
  signUp = 'Auth/signUp',
}

const authRoutes: RouteRecordRaw[] = [
  {
    children: [
      {
        component: SignInView,
        name: AuthRoutes.signIn,
        path: 'sign-in',
        props: ({ query }) => ({
          redirect: query.redirect,
        }),
      },
      {
        component: SignUpView,
        name: AuthRoutes.signUp,
        path: 'sign-up',
      },
    ],
    meta: { allowAnonymous: true, layout: 'AuthLayout' },
    path: '/auth',
    redirect: { name: AuthRoutes.signIn },
  },
]

export default authRoutes
