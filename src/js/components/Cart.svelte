<script>
    import * as utils from "../utils.mts";
    import CartItem from "./CartItem.svelte";
    
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.finalPrice * item.quantity;
        }, 0);
    }
    let removeItem = (item) => {
        props.removeItem(item);
        cartItems = utils.getCartItems();
        total = getCartTotal();
    };
    let addItem = (item) => {
        props.addItem(item);
        cartItems = utils.getCartItems();
        total = getCartTotal();
    };

    let cartItems = $state( utils.getCartItems() );
    let total = $state( getCartTotal() );
    const props = $props();

</script>

<ul>
    {#each cartItems as item}
        <CartItem item={item} removeItem={removeItem} addItem={addItem} cartItems={cartItems} />
    {/each}
    {#if cartItems.length === 0}
        <p>Cart is empty. Let's go <a href="/">shopping</a>!</p>
    {/if}
</ul>

{#if cartItems.length !== 0}
    <div class="cart-footer" >
        <p class="cart-total"><b>Subtotal:</b> ${total.toFixed(2)}</p>
        <br><br>
        <button onclick={location.href = '/checkout/index.html'}>Checkout</button>
    </div>
{/if}

<style>
.cart-footer {
    position: relative;
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}
.cart-footer .cart-total {
    position: absolute;
    right: 2rem;
}
</style>