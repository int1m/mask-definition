<script lang="ts" setup>
import { computed, ref } from 'vue';

import { NSelect, NScrollbar, useMessage } from 'naive-ui';
import VButton from '@/components/kit/VButton.vue';
import VInput from '@/components/kit/VInput.vue';
import VEmpty from '@/components/kit/VEmpty.vue';

const message = useMessage();

const networkClass = ref(0);
const networkClassOptions = [
  {
    value: 0,
    label: 'Класс A',
  },
  {
    value: 1,
    label: 'Класс B',
  },
  {
    value: 2,
    label: 'Класс C',
  },
];

const subnetsCount = ref(null);
const computersCount = ref(null);

const ipAddresses = ref<Array<any>>([]);
const isAddressesEmptyCssPropsHeight = computed(() => (ipAddresses.value.length === 0 ? '100%' : 'unset'));

const onClickSubmitHandler = () => {
  message.error('Ошибка!!!');

  for (let i = 0; i < 20; i += 1) {
    ipAddresses.value.push({
      value: '134.414.313.5',
    });
  }

  console.log(`${networkClass.value}, ${subnetsCount.value}, ${computersCount.value}`);
};
</script>

<template>
  <div class="mask-definition">
    <div class="mask-definition-content">
      <h1 class="mask-definition-title">
        Определение маски
      </h1>
      <div class="mask-definition-container">
        <div class="mask-definition-form">
          <n-select
            v-model:value="networkClass"
            :options="networkClassOptions"
            to=".network-class-options-render-container"
            class="mask-definition-form-select"
          />
          <v-input
            v-model:value="subnetsCount"
            class="mask-definition-form-input"
            placeholder="Количество подсетей"
            style-type="form"
          />
          <v-input
            v-model:value="computersCount"
            class="mask-definition-form-input"
            placeholder="Количество компьютеров"
            style-type="form"
          />
          <v-button type="primary" @click="onClickSubmitHandler">
            Определить
          </v-button>
        </div>
        <div class="mask-definition-content-addresses">
          <n-scrollbar class="addresses-scrollbar">
            <v-empty v-if="ipAddresses.length === 0">
              Список IP адресов пуст
            </v-empty>
            <div
              v-for="(address, index) in ipAddresses"
              :key="index"
              class="adress"
            >
              {{ address.value }}
            </div>
          </n-scrollbar>
        </div>
      </div>
    </div>
    <div class="network-class-options-render-container" />
  </div>
</template>

<style lang="scss" scoped>
.mask-definition {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  padding: 0 1rem;

  @media (max-width: 926px) {
    min-height: calc(var(--vh, 1vh) * 100);
  }

  .mask-definition-content {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .mask-definition-title {
      text-align: center;
    }

    .mask-definition-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.5rem;
      max-width: 860px;

      @media (max-width: 926px) {
        min-width: 100%;
        flex-direction: column;
      }

      .mask-definition-form {
        width: 100%;
        display: flex;
        gap: 1rem;
        padding: 1rem 0;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: hidden;

        @media (max-width: 926px) {
          flex-direction: column;
        }

        .mask-definition-form-select {
          max-width: 200px;

          @media (max-width: 926px) {
            max-width: 100%;
          }

          :deep(.n-base-selection) {
            .n-base-selection__state-border {
              box-shadow: none;
            }
          }
        }

        .mask-definition-form-input {
          max-width: 240px;

          @media (max-width: 926px) {
            max-width: 100%;
          }
        }
      }

      .mask-definition-content-addresses {
        width: 100%;
        height: 260px;
        max-height: 260px;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        background-color: rgb(29, 29, 29);
        border-radius: var(--border-radius-default);
        padding: 1rem 1rem;
        overflow: hidden;
        contain: strict;

        :deep(.addresses-scrollbar) {
          .n-scrollbar-rail {
            display: none;
            right: 0;
          }

          @media (min-width: 927px) {
            .n-scrollbar-rail {
              display: block;
            }
          }

          .n-scrollbar-content {
            min-height: 100%;
            height: v-bind('isAddressesEmptyCssPropsHeight');
          }
        }

        .address {
          color: var(--color-text-secondary);
          font-weight: 500;
        }
      }
    }
  }

  .network-class-options-render-container {
    :deep(.v-binder-follower-container) {
      .v-binder-follower-content {
        margin-top: 0.5rem;
      }

      .n-base-select-menu {
        margin: 0;

        .n-scrollbar {
          .n-virtual-list {
            border-radius: var(--border-radius-default);

            .v-vl-items {
              padding-top: 0 !important;
              padding-bottom: 0 !important;
            }
          }
        }
      }
    }
  }
}
</style>
