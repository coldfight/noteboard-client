import Vue from "vue";
import Router from "vue-router";
import Noteboard from "./components/pages/Noteboard.vue";
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
    },
    {
      path: "/about",
      name: "@about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/pages/About.vue")
    }
  ]
});
