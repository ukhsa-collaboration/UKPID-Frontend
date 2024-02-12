export const mainNavigateTo = (router) => {
  // Enquiries
  window.navigateTo.onOpenNewEnquiry(() => {
    router.push({ name: "enquiries.new" });
  });

  // Settings
  window.navigateTo.onOpenAbout(() => {
    router.push({ name: "settings.about" });
  });
};
