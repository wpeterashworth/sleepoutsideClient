<script>
  const { item, removeItem, moveToCart } = $props();
</script>

<style>
.card {
  display: grid;
  grid-template-columns: 25% auto 25%;
  font-size: var(--small-font);
  align-items: center;
  position: relative;
  gap: 1rem;
}

.card__image {
  grid-row: 1/3;
  grid-column: 1;
}

.card p {
  margin-top: 0;
}

.card .card__name {
  grid-row: 1;
  grid-column: 2;
}

.card__color {
  grid-row: 2;
  grid-column: 2;
}

.card__price {
  grid-row: 1;
  grid-column: 3;
}

.card__actions {
  grid-row: 2;
  grid-column: 3;
  display: flex;
  gap: 0.5rem;
}

button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.add-to-cart-btn {
  background-color: var(--primary-color, #007bff);
  color: white;
  border: none;
}

.remove-btn {
  background-color: transparent;
  color: #dc3545;
  border: 1px solid #dc3545;
}
</style>

<li class="card divider">
  <a href="/product_pages/index.html?product={item.id}" class="card__image">
    <img
      src="{item.images.primarySmall}"
      alt="{item.name}"
    />
  </a>
  <a href="/product_pages/index.html?product={item.id}">
    <h2 class="card__name">{item.name}</h2>
  </a>
  <p class="card__color">{item.colors[0].colorName}</p>
  <p class="card__price">${item.finalPrice.toFixed(2)}</p>
  <div class="card__actions">
    <button class="add-to-cart-btn" onclick={() => moveToCart(item)}>Add to Cart</button>
    <button class="remove-btn" onclick={() => removeItem(item)}>Remove</button>
  </div>
</li>
