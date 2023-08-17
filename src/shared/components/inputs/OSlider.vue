<script setup lang="ts">
import type { Integer } from 'src/types/scalars'

import type { SliderMarkerLabelDefinitionRequiredValue } from 'quasar/dist/types/api/slider'

interface Props {
  disable: boolean
  max: Integer
  min: Integer
  modelValue: Integer
  step: Integer
  labelAlways: boolean
  label: string
}

const props = withDefaults(
  defineProps<Props>(),
  {
    disable: false,
    label: '',
    labelAlways: false,
    max: 0,
    min: 0,
    modelValue: 0,
    step: 1,
  },
)

defineEmits([
  'update:modelValue',
  'update:model-value',
])

const { min, max } = toRefs(props)

const { integer } = useFormatters()

const model = useVModel(props, 'modelValue')

const markers = computed<SliderMarkerLabelDefinitionRequiredValue[]>(() => [min, max].map(v => ({ label: integer.format(get(v)), value: get(v) })))
</script>

<template>
  <div class="o-slider">
    <p
      v-if="label"
      class="q-my-none"
      v-text="`${label}: ${model}`"
    />

    <q-slider
      v-model="model"
      :min="min"
      :max="max"
      track-size="2px"
      thumb-size="18px"
      thumb-color="primary"
      snap
      markers
      label
      switch-label-side
      :disable="disable"
      :label-always="labelAlways"
      :label-value="$formatters.integer.format(modelValue)"
    />

    <div class="row justify-between">
      <span
        v-for="marker in markers"
        :key="marker.value"
        class="o-slider__marker"
        v-text="marker.label"
      />
    </div>
  </div>
</template>

<style lang="scss">
.o-slider {
  .q-slider {
    padding-left: 1px;
    padding-right: 1px;
  }

  &__marker {
    margin-top: 1px;
    font-size: 12px;
  }
}
</style>
