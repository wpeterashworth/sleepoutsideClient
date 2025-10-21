import * as utils from "./utils.mts";
import ProductList from "./components/ProductList.svelte";
import UserMenu from './components/UserMenu.svelte';

// get category from query string
const category = utils.getParam("category");

utils.mountSvelte(ProductList, ".products", { category: category });
utils.mountSvelte(UserMenu, ".user-menu-container");