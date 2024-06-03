import trucksRoutes from "@/modules/trucks/routes";
import RouterModule from "../router";

export class TrucksModule {
  routerModule: RouterModule;
  get name() {
    return "trucks";
  }

  constructor(routerModule: RouterModule) {
    this.routerModule = routerModule;
  }

  install() {
    this.routerModule.addRoutes(trucksRoutes);
  }
}
