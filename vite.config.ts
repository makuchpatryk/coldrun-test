import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "trucks",
        replacement: fileURLToPath(
          new URL("./src/modules/trucks", import.meta.url)
        ),
      },
      {
        find: "core",
        replacement: fileURLToPath(
          new URL("./src/modules/core", import.meta.url)
        ),
      },
      {
        find: "home",
        replacement: fileURLToPath(
          new URL("./src/modules/home", import.meta.url)
        ),
      },
    ],
  },
});
