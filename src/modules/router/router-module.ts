import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHistory,
} from "vue-router";

export class RouterModule {
  router!: Router;
  get name() {
    return "router";
  }

  install() {
    this.router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: [],
    });
  }

  addRoutes(routes: RouteRecordRaw[]) {
    routes.forEach((route) => this.router?.addRoute(route));
  }
}
