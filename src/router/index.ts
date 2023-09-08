import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginPage.vue";
import HomeVue from "../views/ToDoPage.vue";
import Calendar from "../views/CalenderPage.vue";
import Note from "../views/NotePage.vue";
import Main from "../views/MainPage.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { hidden: true, title: "login" },
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: { hidden: true, title: "Main" },
    children: [
      {
        path: "todo",
        name: "ToDo",
        component: HomeVue,
        meta: { hidden: true, title: "todo" },
      },
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar,
        meta: { hidden: true, title: "calendar" },
      },
      {
        path: "note",
        name: "Note",
        component: Note,
        meta: { hidden: true, title: "note" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title as string;
});
export default router;
