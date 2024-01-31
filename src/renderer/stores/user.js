import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const id = ref();
  const name = ref();
  const email = ref();
  const location = ref();
  const role = ref([]);
  const createdAt = ref();
  const updatedAt = ref();

  const requestAndSetUser = async () => {
    const user = await window.user.get();

    id.value = user.id;
    name.value = user.name;
    email.value = user.email;
    location.value = user.location;
    role.value = user.role;
    createdAt.value = user.createdAt;
    updatedAt.value = user.updatedAt;
  };

  return {
    id,
    name,
    email,
    location,
    role,
    createdAt,
    updatedAt,
    requestAndSetUser,
  };
});
