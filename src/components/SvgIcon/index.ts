import { App } from "vue";
import SvgIcon from "./index.vue";

SvgIcon.install = (app: App): void => {
  app.component(SvgIcon.name, SvgIcon);
};

export default SvgIcon;
