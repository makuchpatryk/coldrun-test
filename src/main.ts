import RouterModule from "@/modules/router";
import CoreModule from "@/modules/core";
import TrucksModule from "@/modules/trucks";
import HomeModule from "./modules/home";
import "./style.css";
import "primeicons/primeicons.css";

function bootstrap() {
  const routerModule = new RouterModule();
  routerModule.install();

  const homeModule = new HomeModule(routerModule);
  homeModule.install();

  const trucksModule = new TrucksModule(routerModule);
  trucksModule.install();

  const coreModule = new CoreModule(routerModule);
  coreModule.install();

  coreModule.mount();
}

bootstrap();
