import * as utils from "./utils.mts";
import type { Product } from "./types.mts";

function renderCartContents() {
  const cartItems = utils.getCartItems();
  const htmlItems = cartItems.map((item: Product) => cartItemTemplate(item));
  const listEl = utils.qs(".product-list");
  if (listEl) listEl.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item: Product) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.id}" class="cart-card__image">
    <img
      src="${item.image}"
      alt="${item.name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.id}">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <p class="cart-card__color">${item.colors[0].colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.finalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
