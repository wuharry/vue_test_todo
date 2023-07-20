import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login.vue';
import HomeVue from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta:{hidden:true,title:'login'}
  },
  {
    path:'/home',
    name:"Home",
    component:HomeVue,
    meta:{hidden:true,title:'todo'}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(to=>{
  document.title = to.meta.title as string;
})
export default router;
