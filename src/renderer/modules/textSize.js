import { designUnit } from "@fluentui/web-components";
import { fluentTarget } from "@/modules/fluent";

const setTextSize = (textSize) => {
  if (isNaN(textSize)) window.alert(textSize);
  designUnit.setValueFor(fluentTarget, 4 * textSize);
  document.documentElement.style.setProperty("--text-scale", textSize);
};

window.settings.getTextSize().then(setTextSize);

window.settings.onTextSize((_event, textSize) => {
  setTextSize(textSize);
});
