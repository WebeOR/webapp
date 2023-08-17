import type { Ref } from 'vue'

import type { QForm } from 'quasar'

import type { Keys } from 'src/types/scalars'
import type { ValidatorReturnType, rules } from '../utils/validators'

import {
  isEmailValid,
  unValidateForm,
  validateForm,
  wrapRule,
} from '../utils/validators'

type RulesRecord = typeof rules

interface UseFromByRefReturn {
  readonly formRef: Ref<QForm | undefined>
  readonly checkValidation: () => Promise<boolean>
  readonly resetValidation: () => void
}

export function useFormByRef(): UseFromByRefReturn {
  const formRef = shallowRef<QForm>()

  function checkValidation(): Promise<boolean> {
    return validateForm(formRef.value)
  }

  function resetValidation(): void {
    return unValidateForm(formRef.value)
  }

  return {
    checkValidation,
    formRef,
    resetValidation,
  }
}

export function useRules() {
  const { t } = useI18n()

  const validators = computed(() => ({
    isEmail: (v: string) => isEmailValid(v) || t('validation.invalid_email'),
    required: (v: string) => (v && v.length > 0) || t('validation.required'),
    shouldBeLessThan: (v: number, n: number) => (typeof v === 'number' && v < n) || t('validation.should_be_less_than'),
    shouldBeMoreThan: (v: number, n: number) => (typeof v === 'number' && v > n) || t('validation.should_be_more_than'),
    shouldBeNonEqual: (curr: string, prev: string) => (curr !== prev) || t('validation.should_be_non_equal'),
    shouldBePositive: (v: number) => (typeof v === 'number' && v > 0) || t('validation.should_be_positive'),
  }))

  return {
    validators,
    wrapRule: (rule: Keys<RulesRecord>, v: any, options?: Record<string, any>, ...args: any[]): ValidatorReturnType => {
      // @ts-expect-error buggy generic
      return wrapRule(get(validators, rule), v, t, options, args)
    },
  }
}
