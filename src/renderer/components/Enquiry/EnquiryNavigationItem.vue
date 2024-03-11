<template>
  <NavigationItem route="enquiry.edit" :route-params="{ id: props.enquiry.id }">
    <template #content>
      <div class="Enquiry">
        <span class="ID">#{{ props.enquiry.id }}</span>
        <span class="Agent">{{ props.enquiry.agent }}</span>
        <span class="Date">{{ date }}</span>
        <UkpidMenu
          placement="bottom"
          button-size="small"
          :slim-button="true"
          :tooltip="$t('More options')"
        >
          <template #button>
            <MenuIcon />
          </template>
          <template #menu>
            <UkpidMenuItem
              ><template #start><PinIcon aria-hidden="true" /></template
              >{{ $t("Pin") }}</UkpidMenuItem
            >
            <UkpidMenuItem
              ><template #start><RemoveIcon aria-hidden="true" /></template
              >{{ $t("Remove from list") }}</UkpidMenuItem
            >
          </template>
        </UkpidMenu>
        <UkpidButton
          ref="popout"
          :slim="true"
          class="Popout"
          aria-describedby="popoutTooltip"
          size="small"
          appearance="transparent"
          @mouseover="popoutTooltip.showTooltip"
          @mouseleave="popoutTooltip.hideTooltip"
          @focusin="popoutTooltip.showTooltip"
          @focusout="popoutTooltip.hideTooltip"
          @click.prevent="openPopout"
        >
          <PopoutIcon />
        </UkpidButton>
        <UkpidTooltip
          v-show="popoutTooltip.tooltipVisible"
          id="popoutTooltip"
          ref="popoutTooltipEl"
          :style="popoutTooltip.floatingStyles"
          >{{ $t("Open in new window") }}
        </UkpidTooltip>
      </div>
    </template>
  </NavigationItem>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { formatRelativeDate } from "@/modules/util";
import { useTooltip } from "@/composables/tooltip";
import NavigationItem from "@/components/NavigationView/NavigationItem.vue";
import UkpidButton from "@/components/UkpidButton.vue";
import UkpidTooltip from "@/components/UkpidTooltip.vue";
import UkpidMenu from "@/components/Menu/UkpidMenu.vue";
import UkpidMenuItem from "@/components/Menu/UkpidMenuItem.vue";
import MenuIcon from "@fluentui/svg-icons/icons/more_horizontal_20_regular.svg";
import PopoutIcon from "@fluentui/svg-icons/icons/window_new_20_regular.svg";
import PinIcon from "@fluentui/svg-icons/icons/pin_20_regular.svg";
import RemoveIcon from "@fluentui/svg-icons/icons/eye_off_20_regular.svg";

const props = defineProps({
  enquiry: {
    type: Object,
    required: true,
  },
});

const popout = ref(null);
const popoutTooltipEl = ref(null);

const popoutTooltip = reactive(
  useTooltip({
    referenceEl: popout,
    tooltipEl: popoutTooltipEl,
    tooltipPlacement: "top",
  }),
);

const date = computed(() => formatRelativeDate(props.enquiry.updated_at));

const openPopout = () => {
  window.enquiries.openPopout(props.enquiry.id);
};
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.Enquiry {
  display: grid;
  grid-template-columns: 1fr max-content max-content max-content;
  grid-template-areas:
    "id date date date"
    "agent agent menu popout";
  grid-area: inner;
  align-items: center;
}

.ID {
  grid-area: id;
}

.Agent {
  grid-area: agent;
  overflow: hidden;
  font-size: var(--type-ramp-minus-1-font-size);
  line-height: var(--type-ramp-minus-1-line-height);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.Date {
  grid-area: date;
  justify-self: end;
  font-size: var(--type-ramp-minus-1-font-size);
  line-height: var(--type-ramp-minus-1-line-height);
}

.Menu {
  grid-area: menu;
}

.Popout {
  grid-area: popout;
}
</style>
