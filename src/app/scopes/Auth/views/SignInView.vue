<script setup lang="ts">
import { useAuthStore } from '@app/stores/auth'

import { rules, wrapRule } from '@shared/utils/validators'

import { AuthRoutes } from '../routes'

interface AuthSignInPayload {
  username: string
  password: string
}

const props = withDefaults(
  defineProps<{
    redirect?: string
  }>(),
  { redirect: '' },
)

const router = useRouter()

const { t } = useI18n()
const { notify } = useQuasar()

const authStore = useAuthStore()

const {
  formRef,
  checkValidation,
} = useFormByRef()

const { redirect } = toRefs(props)

const model = reactive<AuthSignInPayload>({
  password: '',
  username: '',
})

const showPassword = shallowRef<boolean>(false)

async function onSubmit(): Promise<void> {
  const isValid = checkValidation()
  if (!isValid)
    return

  const { isFailed, messages } = await authStore.processSignIn(model.username, model.password)

  notify({
    color: !isFailed ? 'green-4' : 'red-5',
    icon: !isFailed ? 'cloud_done' : 'warning',
    message: messages?.map(v => t(v)).join(', '),
    textColor: 'white',
  })

  const normalizedRedirectUrl = normalizeUri(get(redirect))

  if (get(redirect) && normalizedRedirectUrl.length > 1) {
    router.replace(normalizedRedirectUrl)
    return
  }

  if (!isFailed)
    router.replace({ path: '/dashboard' })
}

function onReset(): void {
  model.password = ''
  model.username = ''
}

function normalizeUri(uri: string): string {
  const result = decodeURIComponent(uri)
  if (result.includes('%2F'))
    return normalizeUri(result)
  return result
}
</script>

<template>
  <q-card class="auth-card bg-grey-1 q-pa-lg">
    <q-form
      ref="formRef"
      class="full-width"
      @submit="onSubmit"
      @reset="onReset"
    >
      <h6 class="text-center text-uppercase q-mb-lg q-mt-none">
        WebApp
      </h6>

      <div class="column q-gutter-md">
        <div class="col">
          <q-input
            v-model.trim="model.username"
            outlined
            clearable
            lazy-rules
            :label="$t('auth.username')"
            :rules="[v => wrapRule(rules.required, v, $t)]"
          >
            <template #prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
        </div>

        <div class="col">
          <q-input
            v-model.trim="model.password"
            outlined
            lazy-rules
            :type="!showPassword ? 'password' : 'text'"
            :label="$t('auth.password')"
            :rules="[v => wrapRule(rules.required, v, $t)]"
          >
            <template #prepend>
              <q-icon name="vpn_key" />
            </template>

            <template #append>
              <q-icon
                :name="`visibility${showPassword ? '_off' : ''}`"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </div>

        <div class="col">
          <q-btn
            class="full-width"
            unelevated
            size="lg"
            type="submit"
            color="primary"
            :label="$t('auth.sign_in')"
          />
        </div>
      </div>

      <div class="row justify-end">
        <q-btn
          flat
          dense
          color="primary"
          class="q-mt-sm"
          :to="{ name: AuthRoutes.signUp }"
          :label="$t('auth.to_sign_up')"
        />
      </div>
    </q-form>
  </q-card>
</template>
