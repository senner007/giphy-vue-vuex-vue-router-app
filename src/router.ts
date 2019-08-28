import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      beforeEnter: (to : any, from, next) => {
        next({ path: "/query", replace : true });
        next();
      }
    },
    {
      path: "/:query",
      name: "query",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Query.vue")
    },
    {
      path: "/:query/:id",
      name: "queryid",
      beforeEnter: (to : any, from, next) => {
        if (to.params.id < 1 || to.params.id > 50) {
          next({ path: "/query", replace : true });
        }
       next();
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Query.vue")
    }
  ]
});
