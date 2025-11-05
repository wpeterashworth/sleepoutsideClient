<script lang="ts">
  import { checkAuth, userStore, logout } from "../auth.svelte";
  import { onMount } from "svelte";
    import Alert from "./Alert.svelte";
  const baseURL = import.meta.env.VITE_SERVER_URL;
  let profile = $state("");

  async function getProfile() {
    const res = await fetch(`${baseURL}/users/protected`, {
      method: "GET",
      headers: {
        // This is how we pass our token to the server for protected routes.
        Authorization: `Bearer ${userStore.token}`
      }
    });
    if (res.ok) {
      return res.json();
    } else {
      // if we get an error back...it means there is something wrong with our token and we should log the user out.
      logout();
    }
  }
  // the effect rune should run when there are changes to a state rune that is used inside of it.
  // @ts-ignore
  $effect(async () => {
    if (userStore.isLoggedIn) {
      profile = await getProfile();
    }
  });
  async function init() {
    await checkAuth();
  }
  onMount(init);
</script>

{#if userStore.isLoggedIn}
  <p>{profile.message}</p>
{:else}
  <Alert message="You must be logged in to view this page" duration={null} type="static" />
{/if}
