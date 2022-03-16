<script lang="ts" setup>
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
  GlobalThemeOverrides,
  darkTheme,
} from 'naive-ui';
import { getCSSVariable } from '@/use/useCssVariables';

const borderRadiusDefault = getCSSVariable('--border-radius-default');
const colorText = getCSSVariable('--color-text');
const primaryColor = getCSSVariable('--color-primary');

const interactiveElementHover = getCSSVariable('--color-interactive-element-hover');

const heightMedium = getCSSVariable('--medium');

const colorShadowDefault = getCSSVariable('--color-default-shadow');

const themeOverrides: GlobalThemeOverrides = {
  common: {
    baseColor: colorText,
    primaryColor,
    primaryColorHover: primaryColor,
    borderRadius: borderRadiusDefault,
    heightMedium: '46px',
    lineHeight: '1.5rem',
    inputColor: 'rgb(44,44,44)',
    popoverColor: 'rgb(44,44,44)',
    hoverColor: interactiveElementHover,
    boxShadow1: 'none',
    boxShadow2: 'none',
    boxShadow3: 'none',
  },
  Popover: {
    padding: '0',
  },
  Select: {
    menuBoxShadow: 'unset',
  },
  Scrollbar: {
    color: 'rgba(0, 0, 0, 0.2)',
    colorHover: 'rgba(0, 0, 0, 0.2)',
  },
};
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <slot></slot>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>

</style>
