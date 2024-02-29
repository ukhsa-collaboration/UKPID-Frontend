import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const users = ref({});

  const getUser = async (id) => {
    if (users.value?.[id]) return users.value[id];

    const user = await window.userApi.user(id);

    users.value[id] = user?.data;
    return users.value[id];
  };

  return {
    users,
    getUser,
  };
});
