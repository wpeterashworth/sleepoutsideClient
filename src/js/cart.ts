import * as utils from "./utils.mts";
import type { Product } from "./types.mts";
import UserMenu from "./components/UserMenu.svelte";
import Cart from "./components/Cart.svelte";

utils.mountSvelte(UserMenu, ".user-menu-container");
utils.mountSvelte(Cart, ".cart-parent", 
  {
    cartItems: utils.getCartItems(),
    removeItem: (product: Product) => utils.removeItemFromCart(product)
  }
);
