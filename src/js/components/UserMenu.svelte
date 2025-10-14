<script lang="ts">
  import { setClick } from "../utils.mts";
  import Dialog from './Dialog.svelte';
  import Login from './Login.svelte';

  let open = $state(false);
  setClick("body", () => open = false);
</script>

<div class="user">
  <button
    onclick={(e) => {e.stopPropagation(); open = !open;}}
    class="user__button"
    aria-label="user management"
    title="User Management"
  >
    <img src="/images/noun-hiker.svg" alt="user icon" />
  </button>
  <nav class="user__menu {open ? 'open' : ''}">
    <Dialog label="Login">
      <Login />
    </Dialog>
    <a href="/profile">Profile</a>
    <a href="/orders">Orders</a>
  </nav>
</div>