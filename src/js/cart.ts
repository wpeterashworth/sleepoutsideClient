import * as utils from "./utils.mts";
import type { Product } from "./types.mts";
import Header from './components/Header.svelte';
import Footer from './components/Footer.svelte';
import { mountSvelte } from './utils.mts';
import UserMenu from "./components/UserMenu.svelte";
import Cart from "./components/Cart.svelte";

mountSvelte(Header, '#header');
mountSvelte(Footer, '#footer');

utils.mountSvelte(UserMenu, ".user-menu-container");
utils.mountSvelte(Cart, ".cart-parent", 
  {
    cartItems: utils.getCartItems(),
    removeItem: (product: Product) => utils.removeItemFromCart(product),
    addItem: (product: Product) => utils.addItemToCart(product, false)
  
function renderCartContents() {
  const cartItems = utils.getCartItems();
  const htmlItems = cartItems.map((item: Product) => cartItemTemplate(item));
  const listEl = utils.qs(".product-list");
  if (listEl) listEl.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item: Product) {
  const newItem = `<li class="cart-card divider">
  <button class="cart-card__remove" type="button" title="Remove item" data-id="${item.id}">X</button>
  <a href="/product_pages/index.html?product=${item.id}" class="cart-card__image">
    <img
      src="${item.images.primarySmall}"
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

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  if (!target) return;
  if (target.classList.contains("cart-card__remove")) {
    const id = target.getAttribute("data-id");
    if (!id) return;
    const items = utils.getCartItems();
    const updated = items.filter((p: Product) => p.id !== id);
    utils.setLocalStorage("so-cart", updated);
    renderCartContents();
  }
);
