// Enquiries
import { sendToMain } from "../webContents";

export const openNewEnquiry = () => {
  sendToMain("navigateTo:newEnquiry");
};

// Settings
export const openAbout = () => {
  sendToMain("navigateTo:about");
};
