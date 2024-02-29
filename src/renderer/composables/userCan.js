import { useUserStore } from "@/stores/user";

export const useUserCan = () => {
  const { can } = useUserStore();

  const cannot = (permission) => !can(permission);

  return {
    can,
    cannot,
  };
};
