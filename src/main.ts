import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";
// 創建一個 Vue 應用實例。它接受一個根組件作為參數,App
const app = createApp(App);
app.use(router);
//將組件掛載到index.html中id=app的地方
app.mount("#app");
