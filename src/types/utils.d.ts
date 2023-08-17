export interface BasePromiseEvent<T = any> {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export interface ProviderResult<T = any> {
  isFailed: boolean
  messages?: string[]
  data?: T
}

export type ModuleCallResult<T = any> = Pick<ProviderResult<T>, 'data' | 'isFailed' | 'messages'>
