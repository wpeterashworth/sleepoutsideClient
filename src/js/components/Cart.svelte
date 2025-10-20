<script>
    import CartItem from "./CartItem.svelte";

    const { cartItems } = $props();
</script>

<ul>
    {#each cartItems as item}
        <CartItem item={item} />
    {/each}
</ul>