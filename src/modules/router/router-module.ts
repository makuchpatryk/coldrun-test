import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHashHistory,
} from "vue-router";

export class RouterModule {
  router!: Router;
  get name() {
    return "router";
  }

  install() {
    this.router = createRouter({
      history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
      routes: [],
    });
  }

  addRoutes(routes: RouteRecordRaw[]) {
    routes.forEach((route) => this.router?.addRoute(route));
  }
}
