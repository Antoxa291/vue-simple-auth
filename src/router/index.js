import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // Wait vuex store
  await store.restored;
  const isUserLoggedIn = store.getters.isAuthenticated;

  if (to.name === "Logout" ) {
    await store.dispatch("logout");
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } 

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isUserLoggedIn) {
      store.dispatch("logout");
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.name === "Login" && isUserLoggedIn) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
