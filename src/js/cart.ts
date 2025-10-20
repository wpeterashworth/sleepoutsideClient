import * as utils from "./utils.mts";
import type { Product } from "./types.mts";
import UserMenu from "./components/UserMenu.svelte";
import Cart from "./components/Cart.svelte";

utils.mountSvelte(UserMenu, ".user-menu-container");
utils.mountSvelte(Cart, ".cart-parent", 
  {
    cartItems: utils.getCartItems()
  }
);


document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  if (!target) return;
  if (target.classList.contains("cart-card__remove")) {
    const id = target.getAttribute("data-id");
    if (!id) return;
    const items = utils.getCartItems();
    const updated = items.filter((p: Product) => p.id !== id);
    utils.setLocalStorage("so-cart", updated);
  }
});
