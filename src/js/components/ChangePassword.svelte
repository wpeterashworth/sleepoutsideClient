<script lang="ts">
  // @ts-ignore
  import Alert from "../alert.mts";
  import { changePassword } from "../auth.svelte.ts";

  let currentPassword = "";
  let newPassword = "";
  let confirmPassword = "";
  let isSubmitting = false;

  function validate(): string | null {
    if (!currentPassword || !newPassword || !confirmPassword) return "All fields are required.";
    if (newPassword.length < 8) return "New password must be at least 8 characters.";
    if (newPassword !== confirmPassword) return "New password and confirmation do not match.";
    if (newPassword === currentPassword) return "New password must be different from current password.";
    return null;
  }

  async function onSubmit(e?: Event) {
    e?.preventDefault();
    const hostDialog = (e?.target as HTMLElement | null)?.closest("dialog") as HTMLDialogElement | null;
    const validationError = validate();
    if (validationError) {
      new Alert({ message: validationError, type: "error" }).show();
      return;
    }
    try {
      isSubmitting = true;
      const message = await changePassword(currentPassword, newPassword);
      new Alert({ message, type: "success" }).show();
      hostDialog?.close();
      currentPassword = "";
      newPassword = "";
      confirmPassword = "";
    } catch (err: any) {
      new Alert({ message: err.message || "Failed to update password", type: "error" }).show();
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form onsubmit={onSubmit}>
  <label for="current">Current password</label>
  <input id="current" type="password" bind:value={currentPassword} autocomplete="current-password" />

  <label for="new">New password</label>
  <input id="new" type="password" bind:value={newPassword} autocomplete="new-password" />

  <label for="confirm">Confirm new password</label>
  <input id="confirm" type="password" bind:value={confirmPassword} autocomplete="new-password" />

  <button disabled={isSubmitting} onclick={onSubmit}>{isSubmitting ? "Updating..." : "Update Password"}</button>
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
  form > button:not(.link-style-button) {
    margin-top: 0.5rem;
  }
</style>


