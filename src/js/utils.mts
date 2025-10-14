import { Product } from "./types.mts";
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

export function getParam(param:string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

export function addItemToCart(product: Product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
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
export function getCartItems() {
  const cartItems = getLocalStorage("so-cart") || [];
  return cartItems;
}