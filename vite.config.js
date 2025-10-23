import { resolve } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";


export default defineConfig({
  plugins: [svelte()],
  root: "src/",

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve('src/index.html'),
        cart: resolve('src/cart/index.html'),
        checkout: resolve('src/checkout/index.html'),
        product1: resolve('src/product_pages/index.html'),
        productList: resolve('src/product-list/index.html'),
        productList: resolve('src/profile/index.html'),
      },
    },
  },
});
