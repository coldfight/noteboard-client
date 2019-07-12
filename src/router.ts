import Vue from "vue";
import Router from "vue-router";
import Home from "./components/pages/Home.vue";
import Noteboard from "./components/pages/Noteboard.vue";
import BoardList from "./components/pages/BoardList.vue";
import BoardItem from "./components/pages/BoardItem.vue";
import EmptyRouterView from "./components/common/EmptyRouterView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes: [
    {
      path: "/",
      component: EmptyRouterView,
      children: [
        {
          path: "",
          name: "@home",
          component: Home
        },
        {
          path: "about",
          name: "@about",
          component: () =>
            import(/* webpackChunkName: "about" */ "./components/pages/About.vue")
        },
        {
          path: "boards",
          component: Noteboard,
          children: [
            {
              path: "",
              name: "@boardsList",
              component: BoardList,
              children: [
                {
                  path: ":id",
                  name: "@boardItem",
                  component: BoardItem
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});
