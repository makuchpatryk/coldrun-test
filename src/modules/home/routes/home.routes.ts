import Home from "home/views/Home.vue";

const homeRoutes = [
  {
    path: "/",
    name: "Home",
    component: async () => await Home,
  },
];

export default homeRoutes;
