<script lang="ts">
  import { userStore, checkAuth } from "../auth.svelte.ts";
  import { getLocalStorage, setLocalStorage } from "../utils.mts";

  checkAuth();

  let isVisible = false;

  function initVisibility() {
    const dismissed = getLocalStorage("so-register-cta-dismissed");
    isVisible = !dismissed && !userStore.isLoggedIn;
  }

  initVisibility();

  function dismiss() {
    setLocalStorage("so-register-cta-dismissed", true);
    isVisible = false;
  }
</script>

{#if isVisible}
  <div class="register-cta" role="region" aria-label="Register promotion">
    <div class="register-cta__content">
      <strong>Join SleepOutside!</strong>
      <span>Register today for a chance to win a premium backpack.</span>
    </div>
    <div class="register-cta__actions">
      <a class="btn" href="/profile/" aria-label="Register now">Register now</a>
      <button class="link" onclick={dismiss} aria-label="Dismiss">No thanks</button>
    </div>
  </div>
{/if}

<style>
  .register-cta {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: #0b3d2e;
    color: #fff;
    border-bottom: 2px solid #0a2f24;
  }
  .register-cta__content {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
  }
  .register-cta__actions {
    display: flex;
    gap: 0.75rem;
  }
  .btn {
    background: #f6c84c;
    color: #000;
    padding: 0.4rem 0.75rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
  }
  .link {
    background: transparent;
    color: #fff;
    border: 0;
    cursor: pointer;
    text-decoration: underline;
  }
</style>


