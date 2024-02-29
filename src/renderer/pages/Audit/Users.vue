<template>
  <ContentFrame :body-grid="false">
    <template #header>
      <ContentTitle>{{ $t("Users") }}</ContentTitle>
    </template>
    <template #body>
      <AuditPage
        model-label="User ID"
        api-key="userApi"
        :fields="{
          name: $t('user.field.name'),
          email: $t('user.field.email'),
          location: $t('user.field.location'),
          password: $t('user.field.password'),
          role: $t('user.field.role'),
        }"
        field-trans-key="user.field"
      >
        <template #targetId="slotProps">
          <UserCard :id="slotProps.targetId">
            {{ slotProps.targetId }}
          </UserCard>
        </template>
      </AuditPage>
    </template>
  </ContentFrame>
</template>

<script setup>
import ContentFrame from "@/components/NavigationView/ContentFrame.vue";
import ContentTitle from "@/components/NavigationView/ContentTitle.vue";
import AuditPage from "@/components/Audit/AuditPage.vue";
import UserCard from "@/components/UserCard.vue";
</script>
