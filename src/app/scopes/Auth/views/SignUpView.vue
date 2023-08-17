<script setup lang="ts">
import { AuthRoutes } from '../routes'

defineEmits([
  'sign-in',
])
</script>

<template>
  <div>
    sign up

    <q-btn :to="{ name: AuthRoutes.signIn }">
      signIn
    </q-btn>
  </div>
</template>
