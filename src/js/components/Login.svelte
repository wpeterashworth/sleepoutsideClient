<script lang="ts">
  import {login} from '../auth.svelte.ts';
  let { callback = null } = $props();
  let email = $state("");
  let password = $state("");

  async function loginHandler(e?: Event) {
    e?.preventDefault();
    const hostDialog = (e?.target as HTMLElement | null)?.closest("dialog") as HTMLDialogElement | null;
    let data = await login(email, password);
    console.log(data);
    hostDialog?.close();

    if (callback != null) {
      callback();
    }
  }
</script>

<form onsubmit={loginHandler}>
  <label for="email">Email</label>
  <input type="text" id="email" bind:value={email} />

  <label for="password">Password</label>
  <input type="password" id="password" bind:value={password} />
  
  <button onclick={loginHandler}>Log In</button>
  <button type="button" class="link-style-button">Register</button>
</form>

<style>
  form {
    display: grid;
    gap: 0.75rem;
  }
  label {
    font-weight: 600;
  }
  input {
    padding: 0.5rem;
    border: 1px solid var(--light-grey);
    border-radius: 4px;
  }
  /* margin on primary action */
  form > button:not(.link-style-button) {
    margin-top: 0.5rem;
  }
</style>


