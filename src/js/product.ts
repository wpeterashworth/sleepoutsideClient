import * as utils from "./utils.mts";
import { productDetails } from "./productDetails.mts";

import UserMenu from './components/UserMenu.svelte';
utils.mountSvelte(UserMenu, ".user-menu-container");

const ProductId = utils.getParam('product');
if (!ProductId) {
  // replace with 404 in the future?
  window.location.href = '/';
} else {
  productDetails(ProductId, '.product-detail');
}