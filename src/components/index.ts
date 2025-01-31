import { App } from "vue";
import SvgIcon from "./SvgIcon/index";
import Breadcrumb from "./Breadcrumb/index";
import { useTheme } from "@/components/plugins/useTheme";

const components = [SvgIcon, Breadcrumb];

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component);
  });

  useTheme(app);
};

export default {
  install
};
