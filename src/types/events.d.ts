/* eslint-disable no-unused-vars */
export interface AlertEvent<T = any> {
  icon?: string
  title: string
  message: string
  variant?: 'ALERT' | 'WARNING' | 'QUESTION'
  fullscreen?: boolean
  cancellable?: boolean
  destination?: string
  cancelValue: T
  okValue: T
  processOnCancel?: () => Promise<unknown>
  processOnOk?: () => Promise<unknown>
}

export interface Alert<T = any> extends AlertEvent<T> {
  id: string
  resolve?: (value: T | PromiseLike<T>) => void
  reject?: (reason?: any) => void
}
