import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/LoginPage.vue';
import HomeVue from "../views/ToDoPage.vue";
import Calendar from "../views/CalenderPage.vue"
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta:{hidden:true,title:'login'}
  },
  {
    path:'/todo',
    name:"ToDo",
    component:HomeVue,
    meta:{hidden:true,title:'todo'}
  },
  {
    path:'/calendar',
    name:"calendar",
    component:Calendar,
    meta:{hidden:true,title:'calendar'}

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
