<script setup lang="ts">
import type {
  AvailableDialogBehavior,
  AvailableDialogMode,
} from 'src/types/dialogs'

import { useDialogBehaviorModel } from '../../composables/dialogs'

interface Props {
  behavior: AvailableDialogBehavior
  maxWidth: string
  mode: AvailableDialogMode
  modelValue: boolean
  name: string
  status: string | Record<string, any>
  title: string
}

const props = withDefaults(
  defineProps<Props>(),
  {
    behavior: 'local',
    maxWidth: '480px',
    mode: 'add',
    modelValue: false,
    name: '',
    status: '',
    title: '',
  },
)

const emit = defineEmits([
  'success',
  'cancel',
  'submit',
  'reset',
  'update:model-value',
  'update:modelValue',
])

const { mode } = toRefs(props)

const { model } = useDialogBehaviorModel(props, emit)

function open(): void {
  set(model, true)
}

function close(): void {
  set(model, false)
  emit('cancel')
}

function toggle(): void {
  set(model, !get(model))
}

defineExpose({
  close,
  mode: get(mode),
  model,
  open,
  toggle,
})
</script>

<script lang="ts">
export interface BaseDialogMethods {
  open: () => void
  close: () => void
  toggle: () => void
  mode: AvailableDialogMode
  model: boolean
}
</script>

<template>
  <slot
    v-if="$slots.activator"
    name="activator"
    :open="open"
    :mode="mode"
    :close="close"
    :toggle="toggle"
    :status="status"
  />

  <q-btn
    v-else
    unelevated
    type="button"
    color="primary"
    :label="$t(mode)"
    @click="open"
  />

  <q-dialog
    persistent
    :model-value="model"
    @hide="close"
  >
    <q-card
      class="full-width bg-grey-1 rounded-borders"
      :style="{ maxWidth }"
    >
      <q-form
        @submit="$emit('submit', $event)"
        @reset="$emit('reset', $event)"
      >
        <q-card-section class="q-pl-sm q-pr-xs q-pt-xs q-pb-none flex items-center justify-between">
          <h6
            class="user-select-none text-uppercase q-px-sm q-my-none"
            v-text="title"
          />

          <q-btn
            round
            unelevated
            size="16px"
            icon="close"
            @click="close"
          />
        </q-card-section>

        <slot name="default" />
      </q-form>
    </q-card>
  </q-dialog>
</template>
