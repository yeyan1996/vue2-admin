import Vue from "vue";
import Router from "vue-router";
import configRoutes from "./modules";

Vue.use(Router);

const commonRoutes = [
  {
    path: "/",
    name: "index",
    redirect: "/example/index"
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName:"notFound" */ "@/views/notFound")
  },
  { path: "*", redirect: "/404" }
];

const router = new Router({
  routes: [...configRoutes, ...commonRoutes]
});

router.beforeEach(async (to, from, next) => {
  //设置标题
  document.title = to.meta.title || "vue模版";
  next();
});

export default router;
