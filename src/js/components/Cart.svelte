<script>
    import CartItem from "./CartItem.svelte";

    const props = $props();
    let cartItems = $state(props.cartItems);
    let removeItem = (item) => {
        cartItems = cartItems.filter((i) => i.id !== item.id);
        props.removeItem(item);
    };

</script>

<ul>
    {#each cartItems as item}
        <CartItem item={item} removeItem={removeItem} cartItems={cartItems} />
    {/each}
    {#if cartItems.length === 0}
        <p>Cart is empty. Let;s go <a href="/">shopping</a>!</p>
    {/if}
</ul>