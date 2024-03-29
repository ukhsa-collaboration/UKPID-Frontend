<template>
  <div class="UkpidPagination">
    <nav aria-label="pagination">
      <ul class="Pagination">
        <li>
          <UkpidButton
            appearance="neutral"
            :disabled="props.currentPage === 1"
            @click.prevent="goTo(props.currentPage - 1)"
          >
            <PrevIcon class="Icon" :aria-label="$t('Previous Page')" />
          </UkpidButton>
        </li>
        <li v-if="props.currentPage > props.perSide + 1">
          <UkpidButton appearance="transparent" @click.prevent="goTo(1)">
            <span aria-hidden="true">1</span
            ><span class="VisuallyHidden">{{ $t("First Page") }}</span>
          </UkpidButton>
        </li>
        <li v-if="props.currentPage > props.perSide + 2" class="Ellipses">
          <MoreIcon class="Icon" :aria-label="$t('Ellipses')" />
        </li>
        <template v-for="n in props.perSide" :key="beforePage(n)">
          <li v-if="beforePage(n) > 0">
            <UkpidButton
              appearance="transparent"
              @click.prevent="goTo(beforePage(n))"
            >
              <i18n-t scope="global" keypath="{pageLabel} {page}" tag="span">
                <template #page>{{ beforePage(n) }}</template>
                <template #pageLabel>
                  <span class="VisuallyHidden">{{ $t("Page") }}</span>
                </template>
              </i18n-t>
            </UkpidButton>
          </li>
        </template>
        <li>
          <UkpidButton appearance="transparent" disabled class="CurrentPage">
            <i18n-t scope="global" keypath="{pageLabel} {page}" tag="span">
              <template #page>{{ props.currentPage }}</template>
              <template #pageLabel>
                <span class="VisuallyHidden">{{ $t("Page") }}</span>
              </template>
            </i18n-t>
          </UkpidButton>
        </li>
        <template v-for="n in props.perSide" :key="afterPage(n)">
          <li v-if="afterPage(n) <= props.lastPage">
            <UkpidButton
              appearance="transparent"
              @click.prevent="goTo(afterPage(n))"
            >
              <i18n-t scope="global" keypath="{pageLabel} {page}" tag="span">
                <template #page>{{ afterPage(n) }}</template>
                <template #pageLabel>
                  <span class="VisuallyHidden">{{ $t("Page") }}</span>
                </template>
              </i18n-t>
            </UkpidButton>
          </li>
        </template>
        <li
          v-if="props.currentPage < props.lastPage - props.perSide - 1"
          class="Ellipses"
        >
          <MoreIcon class="Icon" :aria-label="$t('Ellipses')" />
        </li>
        <li v-if="props.currentPage < props.lastPage - props.perSide">
          <UkpidButton
            appearance="transparent"
            @click.prevent="goTo(props.lastPage)"
          >
            <span aria-hidden="true">{{ props.lastPage }}</span
            ><span class="VisuallyHidden">{{ $t("Last Page") }}</span>
          </UkpidButton>
        </li>
        <li>
          <UkpidButton
            appearance="neutral"
            :disabled="props.currentPage === props.lastPage"
            @click.prevent="goTo(props.currentPage + 1)"
          >
            <NextIcon class="Icon" :aria-label="$t('Next Page')" />
          </UkpidButton>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import PrevIcon from "@fluentui/svg-icons/icons/chevron_left_16_regular.svg";
import NextIcon from "@fluentui/svg-icons/icons/chevron_right_16_regular.svg";
import MoreIcon from "@fluentui/svg-icons/icons/more_horizontal_16_regular.svg";
import UkpidButton from "@/components/UkpidButton.vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  lastPage: {
    type: Number,
    required: true,
  },
  perSide: {
    type: Number,
    default: 2,
  },
});

const emit = defineEmits(["goTo"]);

const goTo = (page) => emit("goTo", page);

const beforePage = (n) => props.currentPage + n - props.perSide - 1;
const afterPage = (n) => props.currentPage + n;
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Pagination {
  display: flex;
  margin: 0;
  padding: 0;
  gap: fns.gap(0.5);
  list-style: none;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.CurrentPage {
  position: relative;
}

.CurrentPage::after {
  position: absolute;
  bottom: 0;
  left: 5px;
  width: calc(100% - 10px);
  height: 0;
  border-top: 1px solid var(--accent-fill-rest);
  border-bottom: 2px solid var(--accent-fill-rest);
  border-radius: calc(1px * var(--control-corner-radius));
  content: "";
}

.CurrentPage::part(control) {
  cursor: initial;
  opacity: 1;
}

.Icon {
  width: 1rem;
  height: 1rem;
}
</style>
