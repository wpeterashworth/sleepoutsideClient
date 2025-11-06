<script lang="ts">
import UserMenu from "./UserMenu.svelte";
import RegisterCTA from "./RegisterCTA.svelte";

let searchTerm = '';

function handleSubmit(e: Event) {
  e.preventDefault();
  if (searchTerm.trim()) {
    // redirect to products page with search term
    window.location.href = `/search/?q=${encodeURIComponent(searchTerm.trim())}`;
  }
}
</script>

<div style="height: 77px"></div>
<RegisterCTA />
<header class="divider">
  <div class="logo">
  <img src="/images/noun_Tent_2517.svg" alt="tent logo" />
  <a href="/"> Sleep<span class="highlight">Outside</span></a>
  </div>
  <nav class="menu-center">
    <form on:submit={handleSubmit}>
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search for a product..."
      />
      <button type="submit">Search</button>
    </form>
  </nav>
  <nav class="menu-right">
    <div class="user-menu-container">
      <UserMenu />
    </div>
  </nav>
</header>

<style>
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  form {
    display: flex;
  }

  input {
    padding: 0.5rem;
    width: 200px;
  }

  button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
  }
  header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    padding: 0 10rem;
  }
</style>