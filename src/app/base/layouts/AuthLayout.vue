<template>
  <q-layout view="hHh Lpr lff">
    <q-page-container>
      <q-page
        padding
        class="auth-page column items-center justify-center"
      >
        <router-view v-slot="{ Component }">
          <transition
            appear
            mode="out-in"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.auth-page {
  overflow: hidden;
  width: 100%;
}

.auth-card {
  width: 325px;
  background-color: #F7F7F7;
  box-shadow:
    0 8px 8px rgba(126, 126, 146, 0.06),
    0 12px 30px rgba(126, 126, 146, 0.12);
  border-radius: 10px;

  .q-input {
    .q-field__control {
      background-color: #E8E8F6;
    }
  }
}
</style>
