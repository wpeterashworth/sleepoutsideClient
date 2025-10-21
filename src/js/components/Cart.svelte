<script>
    import CartItem from "./CartItem.svelte";

    const props = $props();
    let cartItems = $state(props.cartItems);
    let removeItem = (item) => {
        props.removeItem(item);
        if (item.quantity < 1) {
            cartItems = cartItems.filter((i) => i.id !== item.id);
        }
    };
    let addItem = (item) => props.addItem(item);

</script>

<ul>
    {#each cartItems as item}
        <CartItem item={item} removeItem={removeItem} addItem={addItem} cartItems={cartItems} />
    {/each}
    {#if cartItems.length === 0}
        <p>Cart is empty. Let's go <a href="/">shopping</a>!</p>
    {/if}
</ul>