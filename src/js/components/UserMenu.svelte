<script lang="ts">
  import { setClick } from "../utils.mts";
  import Dialog from './Dialog.svelte';
  import Login from './Login.svelte';

  function openUserMenu(e: Event) {
    e.stopPropagation();
    const menuElement = document.querySelector(".user__menu");
    menuElement?.classList.toggle("open");
  }

  // Close any open menus when clicking outside
  setClick("body", () => {
    const openMenus = document.querySelectorAll(".open");
    openMenus.forEach((el) => {
      el?.classList.remove("open");
    });
  });
</script>

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
    <Dialog label="Login"><Login /></Dialog>
    <a href="/profile">Profile</a>
    <a href="/orders">Orders</a>
  </nav>
</div>