<template>
  <span ref="tooltipTarget" @mouseover="showTooltip" @mouseleave="hideTooltip">
    <slot />
    <UkpidPopover
      v-if="tooltipVisible"
      id="tooltip"
      ref="tooltipEl"
      :style="floatingStyles"
    >
      <UkpidProgressRing
        v-if="loading"
        size="small"
        :label="$t('Loading&hellip;')"
        label-position="after"
      />
      <div v-else-if="userObj" class="UserInfo">
        <span class="Subtitle2">{{ userObj.name }}</span>
        <span class="Caption1">{{ $t(`location.${userObj.location}`) }}</span>
        <span class="Caption1">{{ userObj.email }}</span>
      </div>
    </UkpidPopover>
  </span>
</template>

<script setup>
import { useUsersStore } from "@/stores/users";
import { onMounted, ref } from "vue";
import { useTooltip } from "@/composables/tooltip";
import UkpidProgressRing from "@/components/UkpidProgressRing.vue";
import UkpidPopover from "@/components/UkpidPopover.vue";

const props = defineProps({
  id: {
    type: Number,
    default: null,
  },
  user: {
    type: Object,
    default: null,
  },
});

const { getUser } = useUsersStore();
const show = ref(false);
const userObj = ref(null);
const loading = ref(false);
const tooltipTarget = ref(null);
const tooltipEl = ref(null);

const onTooltipShow = async () => {
  show.value = true;

  if (!userObj.value) {
    try {
      loading.value = true;
      userObj.value = await getUser(props.id);
      loading.value = false;
    } catch (e) {
      loading.value = false;
    }
  }
};

const { tooltipVisible, showTooltip, hideTooltip, floatingStyles } = useTooltip(
  {
    referenceEl: tooltipTarget,
    tooltipEl,
    tooltipShowCallback: onTooltipShow,
  },
);

onMounted(() => {
  if (props.user) userObj.value = props.user;
});
</script>

<style lang="scss" scoped>
.UserInfo {
  display: flex;
  flex-direction: column;
}

.Subtitle2 {
  margin-top: 0;
  margin-bottom: 0.25rem;
}
</style>
