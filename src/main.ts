import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/** element-plus ui */
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

/** load svg */
import "@/icons/index";

/** load custom component */
import VComponents from "./components/index";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(VComponents)
  .mount("#app");
