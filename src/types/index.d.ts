import type { App } from 'vue'

export type ErrorHandler = (err: Error) => void

export type Token = string | null

export type UserPlugin = (ctx: App<Element>) => void
