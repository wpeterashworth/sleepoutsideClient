import type { Product } from "./types.mts";
import { setLocalStorage, getParam } from "./utils.mts";
import { findProductById } from "./productData.mts";
import { productDetails } from "./productDetails.mts";

const ProductId = getParam('product');
if (!ProductId) {
  // replace with 404 in the future?
  window.location.href = '/';
} else {
  productDetails(ProductId, '.product-detail');
}