<template>
  <AuditFilters
    v-model:id="modelId"
    v-model:owner="params.owner"
    v-model:event="params.event"
    v-model:field="params.field"
    v-model:date_from="params.date_from"
    v-model:date_to="params.date_to"
    v-model:all-day="allDay"
    :model-filter-label="props.modelLabel"
    :fields="props.fields"
    :disabled="loading"
    @apply="getAudits"
    @reset="resetFilters"
  >
  </AuditFilters>
  <div class="Sort">
    <AuditSort
      v-model:order="params.order"
      v-model:orderBy="params.order_by"
      :disabled="loading"
      @apply="getAudits"
    />
    <UkpidPagination
      v-if="audits.meta"
      :per-page="audits.meta.per_page"
      :last-page="audits.meta.last_page"
      :current-page="audits.meta.current_page"
      :per-side="1"
      @go-to="goToPage"
    />
  </div>
  <DataGrid class="AuditTable">
    <DataGridHeader>
      <DataGridRow>
        <DataGridHeaderCell>{{ props.modelLabel }}</DataGridHeaderCell>
        <DataGridHeaderCell>{{ $t("Event") }}</DataGridHeaderCell>
        <DataGridHeaderCell>{{ $t("Made by") }}</DataGridHeaderCell>
        <DataGridHeaderCell>{{ $t("Date - Time") }}</DataGridHeaderCell>
        <DataGridHeaderCell>{{ $t("Field") }}</DataGridHeaderCell>
        <DataGridHeaderCell>{{ $t("Altered From") }}</DataGridHeaderCell>
        <DataGridHeaderCell>{{ $t("Altered To") }}</DataGridHeaderCell>
      </DataGridRow>
    </DataGridHeader>
    <DataGridBody>
      <template v-if="loading">
        <DataGridMessage :colspan="7">
          <template #default>
            <UkpidProgressRing
              size="medium"
              :label="$t('Loading&hellip;')"
              label-position="after"
            />
          </template>
        </DataGridMessage>
      </template>
      <template v-else-if="error">
        <DataGridMessage :colspan="7">
          <template #icon>
            <NoResultsIcon />
          </template>
          <template #default>
            {{ error }}
          </template>
        </DataGridMessage>
      </template>
      <template v-else-if="audits?.data?.length">
        <template v-for="log in audits?.data" :key="log.id">
          <DataGridRow
            v-for="(key, index) in logFields(log)"
            :key="`${log.id}-${key}`"
          >
            <DataGridCell
              v-if="showDuplicateCell(index)"
              :rowspan="duplicateCellRowSpan(log)"
            >
              <slot name="targetId" :log="log" :target-id="log.target_id">{{
                log.target_id
              }}</slot>
            </DataGridCell>
            <DataGridCell
              v-if="showDuplicateCell(index)"
              :rowspan="duplicateCellRowSpan(log)"
            >
              {{ $t(`audit.event.${log.event}`) }}
            </DataGridCell>
            <DataGridCell
              v-if="showDuplicateCell(index)"
              :rowspan="duplicateCellRowSpan(log)"
            >
              <UserCard v-if="log.owner" :user="log.owner">
                {{ log.owner.name }}
              </UserCard>
              <template v-else>{{ $t("System") }}</template>
            </DataGridCell>
            <DataGridCell
              v-if="showDuplicateCell(index)"
              :rowspan="duplicateCellRowSpan(log)"
            >
              {{ formatDateTime(log.date) }}
            </DataGridCell>
            <DataGridCell>{{
              $t(`${props.fieldTransKey}.${key}`)
            }}</DataGridCell>
            <DataGridCell>{{ log.old_values?.[key] ?? "-" }}</DataGridCell>
            <DataGridCell>{{ log.new_values?.[key] ?? "-" }}</DataGridCell>
          </DataGridRow>
        </template>
      </template>
      <template v-else>
        <DataGridMessage :colspan="7">
          <template #icon>
            <NoResultsIcon />
          </template>
          <template #default>
            {{ $t("No results") }}
          </template>
        </DataGridMessage>
      </template>
    </DataGridBody>
  </DataGrid>
  <UkpidPagination
    v-if="audits.meta"
    class="FooterPagination"
    :last-page="audits.meta.last_page"
    :current-page="audits.meta.current_page"
    @go-to="goToPage"
  />
</template>

<script setup>
import * as Sentry from "@sentry/electron";
import { onMounted, ref } from "vue";
import { formatDateTime } from "@/modules/util";
import { apiRequest } from "@/modules/apiRequest";
import UserCard from "@/components/UserCard.vue";
import DataGrid from "@/components/DataGrid/DataGrid.vue";
import DataGridHeader from "@/components/DataGrid/DataGridHeader.vue";
import DataGridRow from "@/components/DataGrid/DataGridRow.vue";
import DataGridHeaderCell from "@/components/DataGrid/DataGridHeaderCell.vue";
import DataGridBody from "@/components/DataGrid/DataGridBody.vue";
import DataGridCell from "@/components/DataGrid/DataGridCell.vue";
import AuditFilters from "@/components/Audit/AuditFilters.vue";
import AuditSort from "@/components/Audit/AuditSort.vue";
import UkpidPagination from "@/components/UkpidPagination.vue";
import UkpidProgressRing from "@/components/UkpidProgressRing.vue";
import NoResultsIcon from "@fluentui/svg-icons/icons/document_bullet_list_off_24_regular.svg";
import DataGridMessage from "@/components/DataGrid/DataGridMessage.vue";
import { useI18n } from "vue-i18n";
import { UnauthenticatedError } from "@/errors/UnauthenticatedError";

const props = defineProps({
  modelLabel: {
    type: String,
    default: "ID",
  },
  fields: {
    type: Object,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  fieldTransKey: {
    type: String,
    required: true,
  },
});

const { t } = useI18n();

const modelId = ref(null);
const audits = ref([]);
const allDay = ref(false);
const initialParams = {
  page: 1,
  event: null,
  field: null,
  date_from: null,
  date_to: null,
  order: "desc",
  order_by: "date",
};
const params = ref({ ...initialParams });
const loading = ref(false);
const error = ref(null);

// Get the field names from the old_values and new_values properties and merge them together, removing duplicates
const logFields = (log) =>
  Array.from(
    new Set(Object.keys(log.old_values).concat(Object.keys(log.new_values))),
  );

const collapseDuplicateCells = ref(true);
const showDuplicateCell = (index) =>
  !collapseDuplicateCells.value || index === 0;
const duplicateCellRowSpan = (log) =>
  collapseDuplicateCells.value ? logFields(log).length : null;

const getAudits = async () => {
  const queryParams = Object.fromEntries(
    Object.entries(params.value).filter(([_, v]) => v),
  );

  try {
    error.value = null;
    loading.value = true;
    audits.value = [];

    if (modelId.value) {
      audits.value = await apiRequest(
        { key: props.apiKey, method: "audit" },
        modelId.value,
        queryParams,
      );
    } else {
      audits.value = await apiRequest(
        { key: props.apiKey, method: "audits" },
        queryParams,
      );
    }
    loading.value = false;
  } catch (e) {
    if (e instanceof UnauthenticatedError) {
      error.value = t("You don't have permission to view audit logs.");
    } else {
      error.value = t("An error occurred");
      Sentry.captureException(e);
    }

    loading.value = false;
  }
};

const resetFilters = () => {
  allDay.value = false;
  modelId.value = null;
  params.value = { ...initialParams };

  // Do it twice because the allDay reset causes the date to be set to today
  // It's a hack, but there's not really another way around it.
  setTimeout(() => {
    params.value = { ...initialParams };
  }, 75);

  getAudits();
};

const goToPage = (page) => {
  params.value.page = page;
  getAudits();
};

onMounted(async () => {
  getAudits();
  collapseDuplicateCells.value = !(await window.auditSettings.getSplit());
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Sort {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: fns.gap(1);
  flex-wrap: wrap;
  gap: fns.gap(1);
}

.AuditTable {
  margin-bottom: fns.gap(2);
}

.FooterPagination {
  display: flex;
  justify-content: center;
}
</style>
