import { Product } from "./types.mts";
import { mount } from "svelte";
import { userStore } from "./auth.svelte.ts";

// wrapper for querySelector...returns matching element
export const qs = (selector:string, parent = document) => parent.querySelector(selector);
export const qsa = (selector:string, parent = document) => parent.querySelectorAll(selector);

// retrieve data from localstorage
export function getLocalStorage(key:string) {
  const item = localStorage.getItem(key)
  if (!item) {
  return null;
  }
  try {
    return JSON.parse(item)
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

export function addItemToCart(product: Product, doAnimation = true) {
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
  if (doAnimation) {
    cartAnimation();
  }
}
function cartAnimation() {
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

// Function will return an object {error: string | null, data: any}
export async function getJSONData(url:string, method:string = "GET", headers:Headers = new Headers(), body?:any) {
  const baseURL = import.meta.env.VITE_SERVER_URL;
  // set both data and error to null initially. One of them will be set and the other should stay null.
  let error:string|null = null;
  let data = null;
  const res = await fetch(`${baseURL}${url}`, {
    method,
    headers,
    body: body? JSON.stringify(body): null,
  })

  if (!res.ok) { //something went wrong
    try {
      // Attempt to parse the error message from the response as JSON
      // hopefully there is something in the response that will help us understand the error that occurred
      const errorMessage = await res.json();
      error = errorMessage.error.message;
    } catch (err) {
      // If parsing fails, use the statusText and OK flag for better debugging information
      error = `${res.statusText} (${res.status})`;
    }
  } else {
    // set the data to be whatever we got back from the server
    data = await res.json()
  }
  return {error, data};
}

// Wishlist functions
function getWishlistKey() {
  // If user is logged in, use user-specific wishlist key
  if (userStore.isLoggedIn && userStore.user?._id) {
    return `so-wishlist-${userStore.user._id}`;
  }
  // Otherwise use generic key for non-logged in users
  return "so-wishlist";
}

export function addItemToWishlist(product: Product) {
  const wishlistItems = getLocalStorage(getWishlistKey()) || [];

  // Check if item already exists in wishlist
  const existingItem = wishlistItems.find((item: Product) => item.id === product.id);
  if (existingItem) {
    // Item already in wishlist, don't add again
    return false;
  }

  // Add item to wishlist (no quantity needed for wishlist)
  wishlistItems.push(product);
  setLocalStorage(getWishlistKey(), wishlistItems);
  return true;
}

export function removeItemFromWishlist(product: Product) {
  let wishlistItems = getLocalStorage(getWishlistKey()) || [];
  wishlistItems = wishlistItems.filter((item: Product) => item.id !== product.id);
  setLocalStorage(getWishlistKey(), wishlistItems);
}

export function getWishlistItems() {
  const wishlistItems = getLocalStorage(getWishlistKey()) || [];
  return wishlistItems;
}

export function isInWishlist(productId: string) {
  const wishlistItems = getLocalStorage(getWishlistKey()) || [];
  return wishlistItems.some((item: Product) => item.id === productId);
}

export function moveToCartFromWishlist(product: Product) {
  // Add to cart
  addItemToCart(product, true);
  // Remove from wishlist
  removeItemFromWishlist(product);
}