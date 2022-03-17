<script lang="ts" setup>
import { ref } from 'vue';

import { NSelect, NScrollbar, useMessage } from 'naive-ui';
import VButton from '@/components/kit/VButton.vue';
import VInputNumber from '@/components/kit/VInputNumber.vue';
import VEmpty from '@/components/kit/VEmpty.vue';

import { calculateNet, CalculateNetType } from '@/use/useMaskDefinition';

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

const subnetsCount = ref<number | null>(null);
const subnetsMessages = ref<Array<string>>([]);

const hostsCount = ref<number | null>(null);
const hostsCountMessages = ref<Array<string>>([]);

const net = ref<CalculateNetType>({
  status: true,
  ipAddresses: [],
  mask: '',
});

const subnetsMessagesClear = () => {
  if (subnetsMessages.value.length > 0) {
    subnetsMessages.value.splice(0, subnetsMessages.value.length);
  }
};

const computersCountMessagesClear = () => {
  if (hostsCountMessages.value.length > 0) {
    hostsCountMessages.value.splice(0, hostsCountMessages.value.length);
  }
};

const formValidation = (): boolean => {
  let isValidate = true;
  subnetsMessagesClear();
  computersCountMessagesClear();

  if (!subnetsCount.value) {
    subnetsMessages.value.push('Поле не заполнено');
    isValidate = false;
  }

  if (!hostsCount.value) {
    hostsCountMessages.value.push('Поле не заполнено');
    isValidate = false;
  }

  return isValidate;
};

const onClickSubmitHandler = () => {
  if (formValidation() && subnetsCount.value !== null && hostsCount.value !== null) {
    net.value = calculateNet(networkClass.value, subnetsCount.value, hostsCount.value);
    // console.log(net);
    if (!net.value.status) {
      message.error('При заданных параметрах, разбиение на подсети невозможно');
    }
  }
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
          <v-input-number
            v-model:value="subnetsCount"
            :messages="subnetsMessages"
            :min="1"
            class="mask-definition-form-input"
            placeholder="Количество подсетей"
            style-type="form"
            @input="subnetsMessagesClear"
          />
          <v-input-number
            v-model:value="hostsCount"
            :messages="hostsCountMessages"
            :min="1"
            class="mask-definition-form-input"
            placeholder="Количество хостов"
            style-type="form"
            @input="computersCountMessagesClear"
          />
          <v-button type="primary" @click="onClickSubmitHandler">
            Определить
          </v-button>
        </div>
        <div class="mask-definition-content-addresses">
          <Transition name="content-addresses">
            <v-empty v-if="net.ipAddresses.length === 0" class="mask-definition-net-empty">
              Список IP адресов пуст
            </v-empty>
            <div v-else-if="net.status" class="mask-definition-net">
              <h2>Маска сети: {{ net.mask }}</h2>
              <div class="mask-definition-net-addresses-title">
                Cписок возможных IP-адресов подсетей:
              </div>
              <n-scrollbar class="addresses-scrollbar">
                <div
                  v-for="address in net.ipAddresses"
                  :key="address"
                  class="address"
                >
                  {{ address }}
                </div>
              </n-scrollbar>
            </div>
          </Transition>
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
        height: 360px;
        max-height: 360px;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        background-color: rgb(29, 29, 29);
        border-radius: var(--border-radius-default);
        overflow: hidden;
        contain: strict;

        .mask-definition-net-empty {
          position: absolute;
          top: 0;
          left: 0;
        }

        .mask-definition-net {
          position: absolute;
          top: 1rem;
          left: 1rem;
          bottom: 1rem;
          right: 1rem;
          overflow: hidden;

          .mask-definition-net-addresses-title {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--color-text-secondary);
          }

          .address {
            color: var(--color-text-secondary);
            font-weight: 500;
            font-size: 0.875rem;
          }

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
            }
          }
        }

        .content-addresses-enter-active {
          transition: all 0.3s ease-out;
        }

        .content-addresses-leave-active {
          transition: all 0.2s ease-in;
        }

        .content-addresses-enter-from,
        .content-addresses-leave-to {
          transform: translateY(-20px);
          opacity: 0;
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
