<template>
  <div
    :id="`item-${props.id}`"
    role="tabpanel"
    :aria-labelledby="`tab-${props.id}`"
    class="PivotItem"
  >
    <Transition
      name="custom-classes"
      :enter-from-class="transitions[transition].enterFromClass"
      :enter-active-class="transitions[transition].enterActiveClass"
      :leave-active-class="transitions[transition].leaveActiveClass"
      :leave-to-class="transitions[transition].leaveToClass"
    >
      <div v-show="model === props.id">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import transitions from "@/modules/transitions";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});
const model = defineModel({ type: [String, Number] });

const transition = ref("entrance");
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;
@use "@/scss/abstracts/placeholders";

.PivotItem {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
