<template>
  <ContentFrame :body-grid="false">
    <template #header>
      <ContentTitle>{{ $t("Enquiries") }}</ContentTitle>
    </template>
    <template #body>
      <AuditPage
        model-label="Enquiry ID"
        api-key="enquiryApi"
        :fields="{
          name: $t('enquiry.field.name'),
          email: $t('enquiry.field.email'),
          location: $t('enquiry.field.location'),
          password: $t('enquiry.field.password'),
          role: $t('enquiry.field.role'),
        }"
        field-trans-key="enquiry.field"
      />
    </template>
  </ContentFrame>
</template>

<script setup>
import ContentFrame from "@/components/NavigationView/ContentFrame.vue";
import ContentTitle from "@/components/NavigationView/ContentTitle.vue";
import AuditPage from "@/components/Audit/AuditPage.vue";
</script>
