import Trucks from "trucks/views/Trucks.vue";

const trucksRoutes = [
  {
    path: "/trucks",
    name: "Trucks",
    component: async () => await Trucks,
  },
];

export default trucksRoutes;
