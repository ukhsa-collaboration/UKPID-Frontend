<template>
  <NavigationView>
    <template #navigation-header>
      <div class="Header">
        <NavigationTitle>{{ $t("Enquiries") }}</NavigationTitle>
        <UkpidButtonGroup class="HeaderButtons">
          <UkpidButton
            ref="newEnqButton"
            aria-describedby="newEnqTooltip"
            size="small"
            appearance="transparent"
            @mouseover="newEnqButtonTooltip.showTooltip"
            @mouseleave="newEnqButtonTooltip.hideTooltip"
            @focusin="newEnqButtonTooltip.showTooltip"
            @focusout="newEnqButtonTooltip.hideTooltip"
          >
            <NewIcon />
          </UkpidButton>
          <UkpidTooltip
            v-show="newEnqButtonTooltip.tooltipVisible"
            id="newEnqTooltip"
            ref="newEnqButtonTooltipEl"
            :style="newEnqButtonTooltip.floatingStyles"
            >{{ $t("New enquiry") }}
          </UkpidTooltip>
          <UkpidButton
            ref="openEnqButton"
            aria-describedby="openEnqTooltip"
            size="small"
            appearance="transparent"
            @mouseover="openEnqButtonTooltip.showTooltip"
            @mouseleave="openEnqButtonTooltip.hideTooltip"
            @focusin="openEnqButtonTooltip.showTooltip"
            @focusout="openEnqButtonTooltip.hideTooltip"
          >
            <OpenIcon />
          </UkpidButton>
          <UkpidTooltip
            v-show="openEnqButtonTooltip.tooltipVisible"
            id="openEnqTooltip"
            ref="openEnqButtonTooltipEl"
            :style="openEnqButtonTooltip.floatingStyles"
            >{{ $t("Open enquiry") }}
          </UkpidTooltip>
        </UkpidButtonGroup>
      </div>
      <div class="SearchFilterGroup">
        <UkpidSearchField v-model="search" size="small" class="Search">{{
          $t("Search")
        }}</UkpidSearchField>
        <UkpidButton
          ref="filterButton"
          aria-describedby="filterTooltip"
          size="small"
          :slim="true"
          appearance="transparent"
          @mouseover="filterButtonTooltip.showTooltip"
          @mouseleave="filterButtonTooltip.hideTooltip"
          @focusin="filterButtonTooltip.showTooltip"
          @focusout="filterButtonTooltip.hideTooltip"
        >
          <FilterIcon />
        </UkpidButton>
        <UkpidTooltip
          v-show="filterButtonTooltip.tooltipVisible"
          id="filterTooltip"
          ref="filterButtonTooltipEl"
          :style="filterButtonTooltip.floatingStyles"
          >{{ $t("Filter") }}
        </UkpidTooltip>
      </div>
    </template>
    <template #navigation-items-top>
      <EnquiryNavigationItem
        v-for="enquiry in enquiries"
        :key="enquiry.id"
        :enquiry="enquiry"
      />
    </template>
  </NavigationView>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserCan } from "@/composables/userCan";
import { useTooltip } from "@/composables/tooltip";
import NavigationView from "@/components/NavigationView/NavigationView.vue";
import NavigationTitle from "@/components/NavigationView/NavigationTitle.vue";
import EnquiryNavigationItem from "@/components/Enquiry/EnquiryNavigationItem.vue";
import UkpidButtonGroup from "@/components/UkpidButtonGroup.vue";
import UkpidButton from "@/components/UkpidButton.vue";
import UkpidSearchField from "@/components/UkpidSearchField.vue";
import UkpidTooltip from "@/components/UkpidTooltip.vue";
import NewIcon from "@fluentui/svg-icons/icons/form_new_20_regular.svg";
import OpenIcon from "@fluentui/svg-icons/icons/folder_open_20_regular.svg";
import FilterIcon from "@fluentui/svg-icons/icons/filter_20_regular.svg";

const { can } = useUserCan();
const search = ref(null);

const newEnqButton = ref(null);
const newEnqButtonTooltipEl = ref(null);

const newEnqButtonTooltip = reactive(
  useTooltip({
    referenceEl: newEnqButton,
    tooltipEl: newEnqButtonTooltipEl,
    tooltipPlacement: "top",
  }),
);

const openEnqButton = ref(null);
const openEnqButtonTooltipEl = ref(null);

const openEnqButtonTooltip = reactive(
  useTooltip({
    referenceEl: openEnqButton,
    tooltipEl: openEnqButtonTooltipEl,
    tooltipPlacement: "top",
  }),
);

const filterButton = ref(null);
const filterButtonTooltipEl = ref(null);

const filterButtonTooltip = reactive(
  useTooltip({
    referenceEl: filterButton,
    tooltipEl: filterButtonTooltipEl,
    tooltipPlacement: "top",
  }),
);

const enquiries = ref([
  {
    id: 101,
    agent: "PY Ant Powder",
    updated_at: "2024-03-05T11:35:24.000000Z",
  },
  {
    id: 102,
    agent: "ASDA Thick Bleach Long Name",
    updated_at: "2024-02-27T11:35:24.000000Z",
  },
  {
    id: 103,
    agent: "Tesco Bleach",
    updated_at: "2023-04-02T11:35:24.000000Z",
  },
  {
    id: 104,
    agent: "PY Ant Powder",
    updated_at: "2024-03-05T11:35:24.000000Z",
  },
  {
    id: 105,
    agent: "ASDA Thick Bleach Long Name",
    updated_at: "2024-02-27T11:35:24.000000Z",
  },
  {
    id: 106,
    agent: "Tesco Bleach",
    updated_at: "2023-04-02T11:35:24.000000Z",
  },
  {
    id: 107,
    agent: "PY Ant Powder",
    updated_at: "2024-03-05T11:35:24.000000Z",
  },
  {
    id: 108,
    agent: "ASDA Thick Bleach Long Name",
    updated_at: "2024-02-27T11:35:24.000000Z",
  },
  {
    id: 109,
    agent: "Tesco Bleach",
    updated_at: "2023-04-02T11:35:24.000000Z",
  },
]);
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.Header {
  display: flex;
  gap: fns.gap(0.25);
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.HeaderButtons {
  gap: fns.gap(0.25);
}

.SearchFilterGroup {
  display: flex;
  gap: fns.gap(0.5) fns.gap(0.25);
  margin-top: fns.gap(1);
  flex-wrap: wrap;
}

.Search {
  flex-grow: 1;
}
</style>
