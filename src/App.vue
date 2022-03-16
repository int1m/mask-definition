<script setup lang="ts">
import AppProvider from '@/AppProvider.vue';
import MaskDefinition from '@/pages/MaskDefinition.vue';
</script>

<template>
  <app-provider>
    <mask-definition />
  </app-provider>
</template>

<style lang="scss">
@import './styles/index';

#app {
  height: 100%;
  @media (max-width: 926px) {
    height: calc(var(--vh, 1vh) * 100);
  }

  .n-config-provider {
    height: 100%;
    @media (max-width: 926px) {
      height: calc(var(--vh, 1vh) * 100);
    }
  }
}
</style>
