<script>
    import * as utils from "../utils.mts";
    import WishlistItem from "./WishlistItem.svelte";

    let removeItem = (item) => {
        utils.removeItemFromWishlist(item);
        wishlistItems = utils.getWishlistItems();
    };

    let moveToCart = (item) => {
        utils.moveToCartFromWishlist(item);
        wishlistItems = utils.getWishlistItems();
    };

    let wishlistItems = $state( utils.getWishlistItems() );
</script>

<ul>
    {#each wishlistItems as item}
        <WishlistItem item={item} removeItem={removeItem} moveToCart={moveToCart} />
    {/each}
    {#if wishlistItems.length === 0}
        <p>Your wishlist is empty. Browse our <a href="/">products</a> and save your favorites!</p>
    {/if}
</ul>

<style>
ul {
    list-style: none;
    padding: 0;
}
</style>
