import * as utils from "./utils.mts";
import { mount } from "svelte";
import ProductList from "./components/ProductList.svelte";

// get category from query string
const category = utils.getParam("category");
console.log(category);

const productList = mount(ProductList, {
  target: document.querySelector(".products"),
  props: { category: "tents" },
});