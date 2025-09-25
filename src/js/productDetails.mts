import { setLocalStorage } from "./utils.mts";
import type { Product } from "./types.mts";
import { Url } from "url";

export async function productDetails(productId:string, selector:string) {
  // get the product from the JSON file
  // call productDetailsTemplate
  let tentData;
  try {
    const response = await fetch('/json/tents.json');
    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }
    tentData = await response.json();
  } catch(error) {
    console.error(error);
  }
  console.log('tentData:', tentData);
  const product = tentData.find((tent: Product) => tent.id === productId);
  if (!product) {
    throw new Error(`Product ID: ${productId} not found`)
  }
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Product with selector: ${selector} not found`)
  }

  
  document.querySelector(selector)!.innerHTML = productDetailsTemplate(product);
}

export function addProductToCart(product:Product) {
  setLocalStorage("so-cart", product);
}

function productDetailsTemplate(product:Product) {
  return `<h3 id="productName">${product.name}</h3>
    <h2 class="divider" id="productNameWithoutBrand">${product.nameWithoutBrand}</h2>
    <img id="productImage" class="divider" src="${product.image}" alt="" />
    <p class="product-card__price" id="productFinalPrice">$${product.finalPrice}</p>
    <p class="product__color" id="productColorName">${product.colors.map( c => c.colorName ).join('/')}</p>
    <p class="product__description" id="productDescriptionHtmlSimple">${product.descriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.id}">Add to Cart</button>
    </div>`;
}