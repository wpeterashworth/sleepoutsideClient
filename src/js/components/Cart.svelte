<script>
    import CartItem from "./CartItem.svelte";

    const { cartItems, removeItem } = $props();
</script>

<ul>
    {#each cartItems as item}
        <CartItem item={item} removeItem={removeItem} />
    {/each}
</ul>