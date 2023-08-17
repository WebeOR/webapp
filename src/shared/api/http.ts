import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  InternalAxiosRequestConfig,
} from 'axios'

import {
  type IStringifyOptions,
  stringify,
} from 'qs'

import type { PromiseOr } from 'src/types/scalars'

export type RequestConfig<D = any> = InternalAxiosRequestConfig<D>
export type ResponseData<T = any, D = any> = AxiosResponse<T, D>
export type ErrorData<T = any, D = any> = AxiosError<T, D>

export interface ProviderResult<T = any> {
  isFailed: boolean
  messages?: string[]
  data?: T
}

export const httpHeaders = {
  acceptCharsetHeader: 'accept-charset',
  acceptEncodingHeader: 'accept-encoding',
  acceptHeader: 'accept',
  acceptLanguageHeader: 'accept-language',
  acceptRangesHeader: 'accept-ranges',
  ageHeader: 'age',
  allowHeader: 'allow',
  authorizationHeader: 'authorization',
  cacheControlHeader: 'cache-control',
  connectionHeader: 'connection',
  contentEncodingHeader: 'content-encoding',
  contentLanguageHeader: 'content-language',
  contentLengthHeader: 'content-length',
  contentLocationHeader: 'content-location',
  contentMD5Header: 'content-md5',
  contentRangeHeader: 'content-range',
  contentTypeHeader: 'content-type',
  dateHeader: 'date',
  etagHeader: 'etag',
  expectHeader: 'expect',
  expiresHeader: 'expires',
  fromHeader: 'from',
  hostHeader: 'host',
  ifMatchHeader: 'if-match',
  ifModifiedSinceHeader: 'if-modified-since',
  ifNoneMatchHeader: 'if-none-match',
  ifRangeHeader: 'if-range',
  ifUnmodifiedSinceHeader: 'if-unmodified-since',
  lastModifiedHeader: 'last-modified',
  locationHeader: 'location',
  maxForwardsHeader: 'max-forwards',
  pragmaHeader: 'pragma',
  proxyAuthenticateHeader: 'proxy-authenticate',
  proxyAuthorizationHeader: 'proxy-authorization',
  rangeHeader: 'range',
  refererHeader: 'referer',
  retryAfterHeader: 'retry-after',
  serverHeader: 'server',
  teHeader: 'te',
  trailerHeader: 'trailer',
  transferEncodingHeader: 'transfer-encoding',
  upgradeHeader: 'upgrade',
  userAgentHeader: 'user-agent',
  varyHeader: 'vary',
  viaHeader: 'via',
  warningHeader: 'warning',
  wwwAuthenticateHeader: 'www-authenticate',
}

export function baseTransformRequestConfig<T = Record<string, any>>(config: RequestConfig<T>): RequestConfig<T> {
  return config
}

export function baseTransformRequestError<T = Record<string, any>>(error: ErrorData<Record<string, any>, T>): void {
  console.error(error.response)
  throw error.response
}

export function baseTransformResponseConfig(config: ResponseData<unknown>): ResponseData<unknown> {
  return config
}

export function baseTransformResponseError<T = Record<string, any>>(error: ErrorData<Record<string, any>, T>): void {
  console.error(error.response)
  throw error.response
}

export class BaseRestProvider {
  private readonly agent: AxiosInstance

  private readonly queryOptions: IStringifyOptions

  public constructor(
    baseURL: string,
    transformRequestConfig?: (config: InternalAxiosRequestConfig) => PromiseOr<InternalAxiosRequestConfig>,
    transformRequestError?: (error: ErrorData<Record<string, any>, Record<string, any>>) => unknown,
    transformResponseConfig?: (value: ResponseData<Record<string, any>, Record<string, any>>) => PromiseOr<ResponseData>,
    transformResponseError?: (error: ErrorData<Record<string, any>, Record<string, any>>) => void,
  ) {
    this.agent = axios.create({
      baseURL,
      responseType: 'json',
    })

    this.queryOptions = {
      arrayFormat: 'repeat',
      charset: 'utf-8',
    }

    if (transformRequestConfig || transformRequestError) {
      this.agent.interceptors.request.use(
        transformRequestConfig,
        transformRequestError,
      )
    }

    if (transformResponseConfig || transformResponseError) {
      this.agent.interceptors.response.use(
        transformResponseConfig,
        transformResponseError,
      )
    }

    console.info('Provider for', baseURL, 'created at', new Date().toISOString())
  }

  public getCancelToken(): CancelTokenSource {
    return axios.CancelToken.source()
  }

  protected get<T = unknown>(url: string, config?: RequestConfig): Promise<ResponseData<T>> {
    return this.agent.get<T>(url, config)
  }

  protected remove<T = unknown>(url: string, config?: RequestConfig): Promise<ResponseData<T>> {
    return this.agent.delete<T>(url, config)
  }

  protected post<T = unknown>(url: string, payload?: unknown, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.agent.post<T>(url, payload, config)
  }

  protected put<T = unknown>(url: string, payload?: unknown, config?: RequestConfig): Promise<ResponseData<T>> {
    return this.agent.put<T>(url, payload, config)
  }

  protected patch<T = unknown>(url: string, payload?: unknown, config?: RequestConfig): Promise<ResponseData<T>> {
    return this.agent.patch<T>(url, payload, config)
  }

  protected getUrlWithParams(url: string, params?: Record<string, any>): string {
    const query = this.stringifyQuery(params)
    const result = [url, query].join('?')
    return query.length > 1 ? result : url
  }

  private stringifyQuery(obj: any): string {
    return stringify(obj, this.queryOptions)
  }
}
