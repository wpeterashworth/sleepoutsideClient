<script>
    const { item, removeItem } = $props();
</script>

<li class="cart-card divider">
  <button class="cart-card__remove" type="button" title="Remove item" onclick={() => removeItem(item)}>X</button>
  <a href="/product_pages/index.html?product={item.id}" class="cart-card__image">
    <img
      src="{item.images.primarySmall}"
      alt="{item.name}"
    />
  </a>
  <a href="/product_pages/index.html?product={item.id}">
    <h2 class="card__name">{item.name}</h2>
  </a>
  <p class="cart-card__color">{item.colors[0].colorName}</p>
  <p class="cart-card__quantity">qty: {item.quantity}</p>
  <p class="cart-card__price">${item.finalPrice}</p>
</li>