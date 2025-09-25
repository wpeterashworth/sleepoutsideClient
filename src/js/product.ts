import type { Product } from "./types.mts";
import { setLocalStorage, getParam } from "./utils.mts";
import { findProductById } from "./productData.mts";
import { addProductToCart, productDetails } from "./productDetails.mts";


// add to cart button event handler
async function addToCartHandler(e: Event) {
  const target = e.target as HTMLButtonElement;
  if (target.dataset.id) {
    const product = await findProductById(target.dataset.id);
    addProductToCart(product);
  }
};

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);

const ProductId = getParam('product');
if (!ProductId) {
  // replace with 404 in the future?
  window.location.href = '/';
} else {
  productDetails(ProductId, '.product-detail');
}