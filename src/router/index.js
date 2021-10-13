import VueRouter from 'vue-router'
import store from "../store";

import Dashboard from "../views/Dashboard";
import Login from "../views/login/login";
import UserShow from "../views/userprofile/show";
import News from "../views/news/news";
import UserEdit from "../views/userprofile/edit";
import ServerList from "../views/server/list";
import ServerDetail from "../views/server/detail"
import Groups from "../views/groups/show";
import GroupDetail from "../views/groups/detail";
import GroupsAdmin from "../views/admin/groups/show";
import NewsAdmin from "../views/admin/news/show";
import ServersAdmin from "../views/admin/servers/show";
import UsersAdmin from "../views/admin/users/show";
import GroupsAdminEdit from "../views/admin/groups/edit";
import NewsAdminEdit from "../views/admin/news/edit";
import ServersAdminEdit from "../views/admin/servers/edit";
import UsersAdminEdit from "../views/admin/users/edit";

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { name: "Dashboard", path: "/", component: Dashboard },
    { name: "UserShow", path: "/user/show", component: UserShow },
    { name: "News", path: "/user/news", component: News },
    { name: "UserEdit", path: "/user/edit", component: UserEdit },
    { name: "ServerList", path: "/server/list", component: ServerList },
    { name: "ServerDetail", path: "/server/detail/:id", component: ServerDetail, props: { id: false } },
    { name: "Groups", path: "/groups", component: Groups},
    { name: "GroupDetail", path: "/group/detail/:id", component: GroupDetail, props: { id: false } },
    { name: "GroupsAdmin", path: "/admin/groups", component: GroupsAdmin, meta: { allowedRoles: [1] } },
    { name: "NewsAdmin", path: "/admin/news", component: NewsAdmin, meta: { allowedRoles: [1] } },
    { name: "ServersAdmin", path: "/admin/servers", component: ServersAdmin, meta: { allowedRoles: [1] } },
    { name: "UsersAdmin", path: "/admin/users", component: UsersAdmin, meta: { allowedRoles: [1] } },
    { name: "GroupsAdminEdit", path: "/admin/groups/edit/:id", component: GroupsAdminEdit, meta: { allowedRoles: [1] }, props: { id: false } },
    { name: "NewsAdminEdit", path: "/admin/news/edit/:id", component: NewsAdminEdit, meta: { allowedRoles: [1] }, props: { id: false } },
    { name: "ServersAdminEdit", path: "/admin/servers/edit/:id", component: ServersAdminEdit, meta: { allowedRoles: [1] }, props: { id: false } },
    { name: "UsersAdminEdit", path: "/admin/users/edit/:id", component: UsersAdminEdit, meta: { allowedRoles: [1] }, props: { id: false } },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        unauthenticated: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = store.getters["Login/isLoggedIn"];
  const userData = store.getters["Login/data"];

  if (!token && !to.matched.some((recrod) => recrod.meta.unauthenticated)) {
    next({ path: "/login", query: { q1: to.path } });
    return;
  }

  if (to.meta.allowedRoles) {
    if (
      !to.matched.some((recrod) =>
        recrod.meta.allowedRoles.includes(parseInt(userData.isAdmin))
      )
    ) {
      // ALERT

      return;
    }
  }

  next();
});

export default router;
