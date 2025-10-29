<script lang="ts">
  import { onMount } from "svelte";
  let dialogRef: HTMLDialogElement | null = null;
  let isExpanded = $state(false);
  let { label, children, required=false } = $props();

  function open() {
    isExpanded = true;
    dialogRef?.showModal();
  }
  function close() {
    isExpanded = false;
    dialogRef?.close();
  }

  onMount(() => {
    if (required) open();
  });
</script>



<button class="link-style-button" aria-expanded={isExpanded} onclick={open}>{label}</button>

<dialog class="hide-backdrop" bind:this={dialogRef} onclose={close}>
  {#if required}
    <button class="dialog__close" aria-label="Close" onclick={() => history.back()}>×</button>
  {:else}
    <button class="dialog__close" aria-label="Close" onclick={close}>×</button>
  {/if}
  {@render children()}
</dialog>
<div class="dialog-backdrop {isExpanded ? '' : 'hide'}"></div>


<style>
  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .dialog-backdrop.hide {
    display: none;
  }
  .hide-backdrop::backdrop {
    display: none;
  }
  dialog {
    border: none;
    border-radius: 8px;
    padding: 1.5rem 1.5rem 1rem;
    width: min(90vw, 480px);
    max-width: 90vw;
    position: relative;
  }
  /* removed unused .dialog__header */
  .dialog__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    color: black;
    border: 0;
    font-size: 1.25rem;
    cursor: pointer;
  }
  .link-style-button {
    background-color: transparent;
    color: var(--dark-grey);
    line-height: inherit;
    cursor: pointer;
    padding: 0;
    font-size: inherit;
  }
</style>