<script>
import { setClick } from "../utils.mts";
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
</script>

<div class="user-menu-container">
    <div class="user">
    <button
        onclick={openUserMenu}
        class="user__button"
        aria-label="user management"
        title="User Management"
    >
        <img src="/images/noun-hiker.svg" alt="user icon" />
    </button>
    <nav class="user__menu">
        <a href="#">Login</a>
        <a href="#">Profile</a>
        <a href="#">Orders</a>
    </nav>
    </div>
</div>