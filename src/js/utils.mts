import { Product } from "./types.mts";
import { mount } from "svelte";

// wrapper for querySelector...returns matching element
export const qs = (selector:string, parent = document) => parent.querySelector(selector);
export const qsa = (selector:string, parent = document) => parent.querySelectorAll(selector);

// retrieve data from localstorage
export function getLocalStorage(key:string) {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (error) {
    return null;
  }
}
// save data to local storage
export function setLocalStorage(key:string, data:any) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
interface ClickHandler {
  (e:Event):void;
}

export function setClick(selector:string, callback:ClickHandler) {
  const element = qs(selector);
  element?.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  element?.addEventListener("click", callback);
}

export function openUserMenu(selector:string) {
  setClick(selector, (e:Event) => {
    e.stopPropagation();
    const el = document.querySelector(".user__menu");
    el?.classList.toggle("open");
  });
  setClick("body", () => {
    const openMenus = document.querySelectorAll(".open");
    openMenus.forEach((el) => {
      el?.classList.remove("open");
    });
  });
}

export function getParam(param:string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

export function addItemToCart(product: Product) {
  const cartItems = getLocalStorage("so-cart") || [];

  // if item already exists in cart, update quantity
  const existingItem = cartItems.find((item: Product) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // if item doesn't exist in cart, add it
    product.quantity = 1;
    cartItems.push(product);
  }
  setLocalStorage("so-cart", cartItems);
  
  // trigger cart bounce animation
  const cartEl = document.querySelector('.cart');
  if (cartEl) {
    cartEl.classList.remove('bounce');
    // force reflow to allow re-triggering animation
    void (cartEl as HTMLElement).offsetWidth;
    cartEl.classList.add('bounce');
    // remove class after animation ends (0.5s)
    setTimeout(() => cartEl.classList.remove('bounce'), 600);
  }
}

export function removeItemFromCart(product: Product) {
  let cartItems = getLocalStorage("so-cart") || [];
  const thisItem = cartItems.find((item: Product) => item.id === product.id);
  if (!thisItem) return;
  if (thisItem.quantity > 1) {
    // if item quantity is greater than 1, reduce quantity
    thisItem.quantity -= 1;
  } else {
    // if item quantity is 1, remove item
    cartItems = cartItems.filter((item: Product) => item.id !== product.id);
  }
  setLocalStorage("so-cart", cartItems);
}
export function getCartItems() {
  const cartItems = getLocalStorage("so-cart") || [];
  return cartItems;
}

export function mountSvelte(svelteComponent: any, targetSelector: string, props?: any) {
  const target = qs(targetSelector);
  if (!target) return console.log(`Svelte target not found: "${targetSelector}"`);

  const options = {
    target,
    props
  };
  mount(svelteComponent, options);
}