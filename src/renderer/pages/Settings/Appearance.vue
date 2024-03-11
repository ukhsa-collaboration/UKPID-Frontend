<template>
  <ContentFrame>
    <template #header>
      <ContentTitle>{{ $t("Appearance") }}</ContentTitle>
    </template>
    <template #body>
      <SettingItem ref="themeSetting">
        <template #icon>
          <ThemeIcon />
        </template>
        <template #label>
          {{ $t("Application theme") }}
        </template>
        <template #control>
          <UkpidSelect
            v-model="theme"
            :aria-labelledby="themeSetting?.label?.id"
            @change="setTheme"
          >
            <UkpidOption value="system" data-test="system">{{
              $t("Use system setting")
            }}</UkpidOption>
            <UkpidOption value="light" data-test="light">{{
              $t("Light")
            }}</UkpidOption>
            <UkpidOption value="dark" data-test="dark">{{
              $t("Dark")
            }}</UkpidOption>
          </UkpidSelect>
        </template>
      </SettingItem>
      <SettingItem ref="contrastSetting">
        <template #icon>
          <ContrastIcon />
        </template>
        <template #label>
          {{ $t("High contrast") }}
          <span class="Caption1">{{
            $t(
              "Use more distinct colours to make text and controls easier to see.",
            )
          }}</span>
        </template>
        <template #control>
          <i18n-t
            v-if="isWindows"
            scope="global"
            keypath="Select a {0} to use this feature."
            tag="span"
            class="Caption1"
          >
            <a href="ms-settings:easeofaccess-highcontrast">{{
              $t("Contrast Theme in Windows Settings")
            }}</a>
          </i18n-t>
          <span v-else class="Caption1"
            >{{ $t("This feature is currently not supported by your system.") }}
          </span>
        </template>
      </SettingItem>
      <SettingItem ref="textSizeSetting">
        <template #icon>
          <TextIcon />
        </template>
        <template #label>
          {{ $t("Text size") }}
        </template>
        <template #control>
          <div class="TextSizeControlContainer">
            {{ $t("{zoom}%", { zoom: parseInt(textSize * 100, 10) }) }}

            <div class="TextSizeControl">
              <span style="font-size: 16px">A</span>
              <UkpidSlider
                v-model="textSize"
                :aria-labelledby="textSizeSetting?.label?.id"
                step="0.1"
                min="1"
                max="2"
                class="TextSizeSlider"
              />
              <span style="font-size: 32px; margin-top: -2px">A</span>
            </div>
            <UkpidButton
              :disabled="
                parseFloat(savedTextSize, 10) === parseFloat(textSize, 10)
              "
              data-testid="text-size-apply"
              @click="setTextSize"
              >{{ $t("Apply") }}</UkpidButton
            >
          </div>
        </template>
      </SettingItem>
    </template>
  </ContentFrame>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import ContentFrame from "@/components/NavigationView/ContentFrame.vue";
import ContentTitle from "@/components/NavigationView/ContentTitle.vue";
import SettingItem from "@/components/SettingItem.vue";
import UkpidSlider from "@/components/UkpidSlider.vue";
import UkpidButton from "@/components/UkpidButton.vue";
import ThemeIcon from "@fluentui/svg-icons/icons/color_24_regular.svg";
import ContrastIcon from "@fluentui/svg-icons/icons/dark_theme_24_regular.svg";
import TextIcon from "@fluentui/svg-icons/icons/text_font_size_24_regular.svg";
import { useOS } from "@/composables/os";
import UkpidOption from "@/components/UkpidOption.vue";
import UkpidSelect from "@/components/UkpidSelect.vue";

const { isWindows } = useOS();

const theme = ref();
const themeSetting = ref(null);

const savedTextSize = ref();
const textSize = ref();
const textSizeSetting = ref(null);
const initialTextSizeSet = ref(false);

onBeforeMount(async () => {
  theme.value = await window.appearanceSettings.getTheme();
  textSize.value = await window.appearanceSettings.getTextSize();
  savedTextSize.value = textSize.value;
  initialTextSizeSet.value = true;

  window.appearanceSettings.onTextSize((_ev, zoom) => {
    textSize.value = zoom;
    savedTextSize.value = zoom;
  });
});

const setTheme = () => {
  window.appearanceSettings.setTheme(theme.value);
};

const setTextSize = () => {
  if (initialTextSizeSet.value) {
    window.appearanceSettings.setTextSize(textSize.value);
  }
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
