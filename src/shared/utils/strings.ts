import { nanoid } from 'nanoid'
import { type IStringifyOptions, parse, stringify } from 'qs'
import { constantCase, noCase } from 'change-case'

import { percent } from './intl/formatters'

interface JwtPayload {
  exp: number
  iat: number
}

export const NOT_ASSIGNED_VALUE = 'n/a'

export const BACKSPACE_KEY = 'Backspace'
export const DELETE_KEY = 'Delete'
export const MINUS_KEY = '-'
export const DOT_KEY = '.'

export const NAVIGATION_KEYS = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Tab',
  'PageDown',
  'PageUp',
  'End',
  'Home',
  'Backspace',
  '-',
]

export const qsConfig: IStringifyOptions = {
  arrayFormat: 'brackets',
  charset: 'utf-8',
  encode: false,
  skipNulls: true,
}

// `encodeURIComponent` doesn't encode -_.!~*'()
export function encode(url: string): string {
  return encodeURIComponent(url)
    .replace(/!/g, '%21')
    .replace(/~/g, '%7E')
    .replace(/\*/g, '%2A')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/%20/g, '+')
}

export function truncateString(v: string, count: number): string {
  return v.length > count ? `${v.substr(0, count)}...` : v
}

export function upperCaseFirst(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export function generateId(length = 16): string {
  return nanoid(length)
}

export function extractDigits(value: string): string {
  return value.replace(/\D/gm, '')
}

export function getRandomInt(length: number): string {
  return Math.random().toString().substr(2, length)
}

export function toUpperSnakeCase(value: string): string {
  return constantCase(value)
}

export function firstSignOf(value: string): string {
  return value.charAt(0)
}

export function isBoolean(value: string): boolean {
  return ['true', 'false'].includes(value)
}

export function toBoolean(value: string, strict = false): boolean {
  if (!isBoolean(value)) {
    if (strict)
      return !!value
    return JSON.parse(value)
  }
  return JSON.parse(value)
}

export function notAssignedValueFormatter(n: number | null, formatFn?: Intl.NumberFormat, notAssignedValue = NOT_ASSIGNED_VALUE, applyToZero = false): string {
  const formatter = formatFn || percent
  const compareMethod = applyToZero ? (n === 0 || n == null) : n == null
  return compareMethod ? notAssignedValue : formatter.format(n as number)
}

export function randomString(size = 6): string {
  return nanoid(size)
}

export function toNoCase(v: string): string {
  return noCase(v)
}

export function parseQuery(value: string): qs.ParsedQs {
  return parse(value)
}

export function stringifyQuery(query: any, options?: Partial<IStringifyOptions>): string {
  return stringify(query, { ...qsConfig, ...options })
}

export function decodeJwt<T = any>(token: string): T & JwtPayload {
  return JSON.parse(decodeURIComponent(
    atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
      .split('')
      .map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
      .join(''),
  ))
}

export function hexToRgb(hex: string): string {
  return hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)
    .match(/.{2}/g)!
    .map(x => Number.parseInt(x, 16))
    .join('')
}
