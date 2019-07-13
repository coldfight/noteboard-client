import Vue from "vue";
import Router from "vue-router";
import HomePage from "./pages/HomePage.vue";
import NoteboardsPage from "./pages/NoteboardsPage.vue";
import NoteboardItemPage from "./pages/NoteboardItemPage.vue";
import EmptyRouterView from "./pages/EmptyRouterView.vue";

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
          component: HomePage
        },
        {
          path: "about",
          name: "@about",
          component: () =>
            import(/* webpackChunkName: "about" */ "./pages/AboutPage.vue")
        },
        {
          path: "boards",
          name: "@noteboardsPage",
          component: NoteboardsPage,
          children: [
            {
              path: ":id",
              name: "@noteboardItemPage",
              component: NoteboardItemPage
            }
          ]
        }
      ]
    }
  ]
});
