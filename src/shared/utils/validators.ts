import type { QForm } from 'quasar'

import type { Keys, NonAny } from 'src/types/scalars'

export type ValidatorType<T = any> = ((...args: T[]) => ValidatorReturnType)
export type ValidatorReturnType = boolean | string | Promise<boolean | string>

export type Rules = Keys<typeof rules>

const MAX_NAME_LENGTH = 30
const emailRegexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

export function isNameValid(v: string): ValidatorReturnType {
  return v.length <= MAX_NAME_LENGTH || `Max ${MAX_NAME_LENGTH} characters`
}

export function isEqual(value: NonAny, compare: NonAny): boolean {
  return value === compare
}

export function isEmailValid(email: string): boolean {
  if (!email)
    return false

  const emailParts = email.split('@')

  if (emailParts.length !== 2)
    return false

  const account = emailParts[0]
  const address = emailParts[1]

  if (account.length > 64)
    return false
  else if (address.length > 255)
    return false

  const domainParts = address.split('.')
  if (domainParts.some(part => part.length > 63))
    return false

  return emailRegexp.test(email)
}

export function validateForm(ref?: QForm): Promise<boolean> {
  if (!ref)
    return Promise.resolve(false)
  return ref.validate()
}

export function unValidateForm(ref?: QForm): void {
  if (!ref)
    return
  return ref.resetValidation()
}

export function wrapRule<T = any>(rule: ValidatorType<T>, v: T, t: (key: string, opts: any) => string, options?: Record<string, any>, ...args: T[]): ValidatorReturnType {
  const result = rule(v, ...args)
  return (typeof result === 'string') ? t(result, options) : result
}

const required: ValidatorType<string> = (v: string) => (v && v.length > 0) || 'validation.required'
const isEmail: ValidatorType<string> = (v: string) => isEmailValid(v) || 'validation.invalid_email'
const shouldBePositive: ValidatorType<number> = (v: number) => (typeof v === 'number' && v > 0) || 'validation.should_be_positive'
const shouldBeMoreThan: ValidatorType<number> = (v: number, n: number) => (typeof v === 'number' && v > n) || 'validation.should_be_more_than'
const shouldBeLessThan: ValidatorType<number> = (v: number, n: number) => (typeof v === 'number' && v < n) || 'validation.should_be_less_than'
const shouldBeNonEqual: ValidatorType<string> = (curr: string, prev: string) => (curr !== prev) || 'validation.should_be_non_equal'

export const rules = {

  /**
   * @example v => wrapRule(rules.isEmail, v, t)
   */
  isEmail,

  /**
   * @example v => wrapRule(rules.required, v, t)
   */
  required,
  /**
   * @example v => wrapRule(rules.shouldBeLessThan, v, $t, { n: NUMBER_VALUE }, NUMBER_VALUE)
   */
  shouldBeLessThan,
  /**
   * @example v => wrapRule(rules.shouldBeMoreThan, v, $t, { n: NUMBER_VALUE }, NUMBER_VALUE)
   */
  shouldBeMoreThan,
  /**
   * @example v => wrapRule(rules.shouldBeNonEqual, v, $t, { n: NUMBER_VALUE }, NUMBER_VALUE)
   */
  shouldBeNonEqual,
  /**
   * @example v => wrapRule(rules.shouldBePositive, v, $t)
   */
  shouldBePositive,
}
