import * as utils from "./utils.mts";
import { mount } from "svelte";
import ProductList from "./components/ProductList.svelte";
import UserMenu from './components/UserMenu.svelte';

// get category from query string
const category = utils.getParam("category");


const productList = document.querySelector(".products");
if (productList) {
  mount(ProductList, {
    target: productList,
    props: { category: category },
  });
}

const userMenu = document.querySelector(".user-menu-container");
if (userMenu) {
  mount(UserMenu, {
    target: userMenu,
  });
}