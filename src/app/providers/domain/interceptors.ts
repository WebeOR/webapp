import { copy } from '@shared/utils/objects'
import type { ErrorData, RequestConfig, ResponseData } from '@shared/api/http'
import { httpHeaders } from '@shared/api/http'

import { Events, authorization } from '@app/base/services'

export function onApiRequestFulfilled<T = Record<string, any>>(config: RequestConfig<T>): RequestConfig<T> {
  const token = authorization.getToken()
  if (token)
    config.headers[httpHeaders.authorizationHeader] = `Bearer ${token}`
  return config
}

export function onApiRequestRejected(error: ErrorData<unknown>): unknown {
  if (import.meta.env.DEV)
    console.log('onApiRequestRejected:', error.response)
  throw error
}

export function onApiResponseFulfilled(response: ResponseData): ResponseData {
  return response
}

export function onApiResponseRejected(error: ErrorData): void {
  if (import.meta.env.DEV)
    console.log('onApiResponseRejected:', copy(error.response))

  if (error.response?.status === 401)
    Events.emit({ eventName: 'auth_required' })

  if (!Object.keys(error.response?.data ?? {}).length)
    error.response!.data = { message: 'errors:api.request_failed' }

  Events.emit({ data: error.response?.data, eventName: 'api_error' })

  if (error.response?.data)
    throw error.response?.data

  error.response!.data = { message: 'errors:api.request_failed' }
  throw error.response
}
