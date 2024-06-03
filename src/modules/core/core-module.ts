import { createApp, App as Application } from "vue";
import App from "core/components/App.vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import RouterModule from "../router";
import Lara from "@/presets/lara";
import ToastService from "primevue/toastservice";

export class CoreModule {
  vm!: Application;
  routerModule: RouterModule;
  currentRouteFullPath: string | undefined;
  constructor(routerModule: RouterModule) {
    this.routerModule = routerModule;
  }

  install() {
    const router = this.routerModule.router;
    const store = createPinia();

    this.vm = createApp(App)
      .use(store)
      .use(router)
      .use(PrimeVue, {
        unstyled: true,
        pt: Lara,
      })
      .use(ToastService);
  }

  async mount() {
    this.vm.mount("#app");
  }
}
