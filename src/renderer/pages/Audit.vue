<template>
  <NavigationView :works-offline="false">
    <template #navigation-title>{{ $t("Audit logs") }}</template>
    <template #navigation-items-top>
      <NavigationItem route="audit" label-trans-key="routes.audit.enquiries"
        ><EnquiryIcon
      /></NavigationItem>
      <NavigationItem route="audit.users"><UserIcon /></NavigationItem>
    </template>
  </NavigationView>
</template>

<script setup>
import NavigationItem from "@/components/NavigationView/NavigationItem.vue";
import NavigationView from "@/components/NavigationView/NavigationView.vue";
import EnquiryIcon from "@fluentui/svg-icons/icons/document_multiple_20_regular.svg";
import UserIcon from "@fluentui/svg-icons/icons/person_20_regular.svg";
</script>
