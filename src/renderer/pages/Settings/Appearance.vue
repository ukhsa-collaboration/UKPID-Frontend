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
          <fluent-select
            v-model="theme"
            :aria-labelledby="themeSetting?.label?.id"
            @change="setTheme"
          >
            <fluent-option value="system" data-test="system">{{
              $t("Use system setting")
            }}</fluent-option>
            <fluent-option value="light" data-test="light">{{
              $t("Light")
            }}</fluent-option>
            <fluent-option value="dark" data-test="dark">{{
              $t("Dark")
            }}</fluent-option>
          </fluent-select>
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
              <FluentSlider
                v-model="textSize"
                :aria-labelledby="textSizeSetting?.label?.id"
                step="0.1"
                min="1"
                max="2"
                class="TextSizeSlider"
              />
              <span style="font-size: 32px; margin-top: -2px">A</span>
            </div>
            <FluentButton
              :disabled="
                parseFloat(savedTextSize, 10) === parseFloat(textSize, 10)
              "
              data-testid="text-size-apply"
              @click="setTextSize"
              >{{ $t("Apply") }}</FluentButton
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
import FluentSlider from "@/components/FluentSlider.vue";
import FluentButton from "@/components/FluentButton.vue";
import ThemeIcon from "@fluentui/svg-icons/icons/color_24_regular.svg";
import ContrastIcon from "@fluentui/svg-icons/icons/dark_theme_24_regular.svg";
import TextIcon from "@fluentui/svg-icons/icons/text_font_size_24_regular.svg";
import { useOS } from "@/composables/os";

const { isWindows } = useOS();

const theme = ref();
const themeSetting = ref(null);

const savedTextSize = ref();
const textSize = ref();
const textSizeSetting = ref(null);
const initialTextSizeSet = ref(false);

onBeforeMount(async () => {
  theme.value = await window.settings.getTheme();
  textSize.value = await window.settings.getTextSize();
  savedTextSize.value = textSize.value;
  initialTextSizeSet.value = true;

  window.settings.onTextSize((_ev, zoom) => {
    textSize.value = zoom;
    savedTextSize.value = zoom;
  });
});

const setTheme = () => {
  window.settings.setTheme(theme.value);
};

const setTextSize = () => {
  if (initialTextSizeSet.value) {
    window.settings.setTextSize(textSize.value);
  }
};
</script>

<style lang="scss">
@use "@/scss/abstracts/placeholders";
@use "@/scss/abstracts/functions" as fns;

.TextSizeControlContainer {
  display: flex;
  gap: fns.gap(1);
  align-items: center;
}

.TextSizeControl {
  display: grid;
  grid-template-columns: min-content 150px min-content;
  align-items: center;
  gap: 8px;
}

.TextSizeSlider {
  width: 100%;
  position: relative;
  top: calc(-2px + var(--thumb-size) * 0.5px);
}
</style>
