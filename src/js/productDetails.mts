import * as utils from "./utils.mts";
import { findProductById } from "./productData.mts";
import type { Product } from "./types.mts";
import Breadcrumb from "./components/Breadcrumb.svelte";

export async function productDetails(productId:string, selector:string) {
  let product:Product;
  try {
    product = await findProductById(productId);
  } catch (error) {
    utils.qs(selector)!.innerHTML = `
      <center>
        <h3>${error}</h3>
        <p>Click <a href="/">here</a> to go back to the homepage.</p>
      <center>
    `;
    return;
  }

  // mount breadcrumb
  utils.mountSvelte(Breadcrumb, '.breadcrumb-container', { category: product.category });

  // set the product html content
  utils.qs(selector)!.innerHTML = productDetailsTemplate(product);

  // add listener to Add to Cart button
  utils.setClick('#addToCart', () => {
    utils.addItemToCart(product);
    // allow cart bounce animation to play before navigating
    setTimeout(() => {
      location.href = '/cart/';
    }, 600);
  });
}

function calculateDiscount(product:Product) {
  if (product.listPrice > product.finalPrice) {
    let discountPercent = ((product.listPrice - product.finalPrice) / product.listPrice) * 100
    const roundedPercent = Math.round(discountPercent)
    return roundedPercent
  }
  else {
    return null
  }
}

function productDetailsTemplate(product:Product) {
  return `<h3 id="productName">${product.name}</h3>
    <h2 class="divider" id="productNameWithoutBrand">${product.nameWithoutBrand}</h2>
    <img id="productImage" class="divider"
      src="${product.images.primaryLarge}"
      srcset="${product.images.primaryMedium} 800w, ${product.images.primaryLarge} 1200w, ${product.images.primaryExtraLarge} 1600w"
      sizes="(max-width: 800px) 100vw, (max-width: 1200px) 80vw, 60vw"
      alt="${product.name}" />
    <p class="product-card__price" id="productFinalPrice">$${product.finalPrice}</p>
    <p class="product__color" id="productColorName">${product.colors.map( c => c.colorName ).join('/')}</p>
    <p class="product__description" id="productDescriptionHtmlSimple">${product.descriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart">Add to Cart</button>
    </div>`;
}