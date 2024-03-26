<template>
  <ContentFrame :body-grid="false">
    <template #header>
      <PivotTabs :label="$t('Enquiry Tabs')">
        <PivotTab
          v-for="tab in tabs"
          :id="tab"
          :key="tab"
          v-model="selectedTab"
        >
          {{ tab }}
        </PivotTab>
      </PivotTabs>
    </template>
    <template #body>
      <PivotItem
        v-for="tab in tabs"
        :id="tab"
        :key="tab"
        v-model="selectedTab"
        selected-tab="selectedTab"
      >
        <EnquiryPage
          v-model="form"
          :page="formDefinition[tab]"
          :codes="mappedCodes"
        />
      </PivotItem>
    </template>
  </ContentFrame>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ContentFrame from "@/components/NavigationView/ContentFrame.vue";
import PivotTabs from "@/components/Pivot/PivotTabs.vue";
import PivotTab from "@/components/Pivot/PivotTab.vue";
import PivotItem from "@/components/Pivot/PivotItem.vue";
import EnquiryPage from "@/components/Enquiry/EnquiryPage.vue";

const selectedTab = ref();
const formDefinition = ref({});
const form = ref({});
const codes = ref({});

onMounted(async () => {
  codes.value = await window.codes.getCodes();
  formDefinition.value = await window.formDefinition.get();
});

const tabs = computed(() => Object.keys(formDefinition.value));

const mappedCodes = computed(() => {
  const mapped = {};

  Object.keys(codes.value).forEach((table) => {
    mapped[table] = {};

    codes.value[table]?.codes?.forEach((code) => {
      mapped[table][code.id] = code.name;
    });
  });

  return mapped;
});
</script>
