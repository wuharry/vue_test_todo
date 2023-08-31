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
  WiHumidity,
  LaTemperatureHighSolid,
  BiCloudRainHeavy, //雨天
  WiDayRain, //太陽雨
  WiNightAltRain, //夜雨
  SiSnowflake, //雪
  RiWindyLine, //大風
  RiSunLine, //晴天
  OiClock, //時間
  OiLocation, //地點
} from "oh-vue-icons/icons";
addIcons(
  MdNoteaddOutlined,
  RiDeleteBin2Line,
  FaEdit,
  BiCalendarDay,
  LaListAltSolid,
  BiCloudRainHeavy,
  WiDayRain,
  WiNightAltRain,
  SiSnowflake,
  RiWindyLine,
  RiSunLine,
  LaTemperatureHighSolid,
  WiHumidity,
  OiClock,
  OiLocation
);


// 創建一個 Vue 應用實例。它接受一個根組件作為參數,App

const app = createApp(App)
  .use(router)
  .use(store)
  .component("VIcon", OhVueIcon)
  //將組件掛載到index.html中id=app的地方
  .mount("#app");
// app.config.globalProperties.$analytics = analytics;
