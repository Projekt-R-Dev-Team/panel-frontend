import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/Dashboard"
import Login from "../views/login/login"

import store from "../store"

const router = new createRouter({
  base: process.env.BASE_URL,
  history: createWebHashHistory(),
  routes: [
    { name: "Dashboard", path: "/", component: Dashboard },

    {
      path: "/login",
      name: "login",
      component: Login,
      meta : {
        unauthenticated: true
      }
    }
  ]});

router.beforeEach((to, from, next) => {
  const token = store.getters["Login/isLoggedIn"];
  const userData = store.getters["Login/data"];

  if (!token && !to.matched.some(recrod => recrod.meta.unauthenticated)) {
    next({ path: "/login", query: { q1: to.path }});
    return;
  }

  if (to.meta.allowedRoles) {
    if (!to.matched.some(recrod => recrod.meta.allowedRoles.includes(parseInt(userData.role)))) {
      // ALERT

      return;
    }
  }

  next();
});

export default router;
