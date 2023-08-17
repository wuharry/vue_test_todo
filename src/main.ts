import { createApp } from "vue";
import "./style.css";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdNoteaddOutlined,
  RiDeleteBin2Line,
  FaEdit,
  BiCalendarDay,
  LaListAltSolid,
} from "oh-vue-icons/icons";

addIcons(
  MdNoteaddOutlined,
  RiDeleteBin2Line,
  FaEdit,
  BiCalendarDay,
  LaListAltSolid
);
// 創建一個 Vue 應用實例。它接受一個根組件作為參數,App
const app = createApp(App)
  .use(router)
  .use(store)
  .component("VIcon", OhVueIcon)
  //將組件掛載到index.html中id=app的地方
  .mount("#app");
