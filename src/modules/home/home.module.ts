import homeRoutes from "@/modules/home/routes";
import RouterModule from "../router";

export class HomeModule {
  routerModule: RouterModule;
  get name() {
    return "home";
  }

  constructor(routerModule: RouterModule) {
    this.routerModule = routerModule;
  }

  install() {
    this.routerModule.addRoutes(homeRoutes);
  }
}
