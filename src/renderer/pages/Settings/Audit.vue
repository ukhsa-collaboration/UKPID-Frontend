<template>
  <ContentFrame>
    <template #header>
      <ContentTitle>{{ $t("Audit") }}</ContentTitle>
    </template>
    <template #body>
      <SettingItem ref="splitSetting">
        <template #icon>
          <SplitIcon />
        </template>
        <template #label>
          {{ $t("Split field changes into individual rows") }}
        </template>
        <template #control>
          <UkpidSwitch
            v-model="split"
            :aria-labelledby="splitSetting?.label?.id"
            :show-messages="false"
            @change="setSplit"
          >
          </UkpidSwitch>
        </template>
      </SettingItem>
    </template>
  </ContentFrame>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useOS } from "@/composables/os";
import ContentFrame from "@/components/NavigationView/ContentFrame.vue";
import ContentTitle from "@/components/NavigationView/ContentTitle.vue";
import SettingItem from "@/components/SettingItem.vue";
import UkpidSwitch from "@/components/UkpidSwitch.vue";
import SplitIcon from "@fluentui/svg-icons/icons/table_cells_split_24_regular.svg";

const { isWindows } = useOS();

const split = ref();
const splitSetting = ref(false);

onBeforeMount(async () => {
  split.value = await window.auditSettings.getSplit();
});

const setSplit = () => {
  window.auditSettings.setSplit(split.value);
};
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/placeholders";
@use "@/scss/abstracts/functions" as fns;

.TextSizeControlContainer {
  display: flex;
  align-items: center;
  gap: fns.gap(1);
}

.TextSizeControl {
  display: grid;
  grid-template-columns: min-content 150px min-content;
  align-items: center;
  gap: 8px;
}

.TextSizeSlider {
  position: relative;
  top: calc(-2px + var(--thumb-size) * 0.5px);
  width: 100%;
}
</style>
