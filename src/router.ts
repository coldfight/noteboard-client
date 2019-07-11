import Vue from "vue";
import Router from "vue-router";
import Noteboard from "./views/Noteboard.vue";
import BoardList from "./components/board/BoardList.vue";
import BoardItem from "./components/board/BoardItem.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes: [
    {
      path: "/",
      // name: "@noteboard",
      component: Noteboard,
      children: [
        {
          path: "",
          name: "@boardsList",
          component: BoardList,
          children: [
            {
              path: "/boards/:id",
              name: "@boardItem",
              component: BoardItem
            }
          ]
        }
      ]
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
