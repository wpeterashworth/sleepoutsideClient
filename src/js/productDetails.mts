import { setLocalStorage, getParam } from "./utils.mts";
const productId = getParam("product");
import type { Product } from "./types.mts";
productDetails(productId, ".product-detail");

function productDetails(productId, selector) {

};

export function addProductToCart(product: Product) {
  setLocalStorage("so-cart", product);
}

function productDetailsTemplate(product) {

}