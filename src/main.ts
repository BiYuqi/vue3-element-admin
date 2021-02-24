import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import element-plus ui library
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

// import custom component
import VComponents from "./components/index";

// import svg icon
import "@/icons/index";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(VComponents)
  .mount("#app");
