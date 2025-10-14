<script lang="ts">
  let dialogRef: HTMLDialogElement | null = null;
  let isExpanded = $state(false);
  let { label, children } = $props();

  function open() {
    isExpanded = true;
    dialogRef?.showModal();
  }

  function close() {
    isExpanded = false;
    dialogRef?.close();
  }
</script>



<button class="link-style-button" aria-expanded={isExpanded} onclick={open}>{label}</button>

<dialog class="dialog-backdrop" bind:this={dialogRef} onclose={close}>
  <button class="dialog__close" aria-label="Close" onclick={close}>×</button>
  {@render children()}
</dialog>


<style>
    .dialog-backdrop::backdrop {
      background: rgba(0, 0, 0, 0.4);
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