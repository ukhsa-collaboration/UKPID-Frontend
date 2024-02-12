// Enquiries
import { sendToMain } from "../web-contents";

export const openNewEnquiry = () => {
  sendToMain("navigateTo:newEnquiry");
};

// Settings
export const openAbout = () => {
  sendToMain("navigateTo:about");
};
