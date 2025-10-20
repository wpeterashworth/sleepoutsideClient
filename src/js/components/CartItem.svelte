<script>
  const { item, removeItem } = $props();

  let quantity = $state(item.quantity);

  function add() { quantity += 1 }
  function subtract() {
    quantity -= 1
    if (quantity < 1) {
      removeItem(item);
    }
  }
</script>
<style>
.card {
  display: grid;
  grid-template-columns: 25% auto 15%;
  font-size: var(--small-font);
  /* max-height: 120px; */
  align-items: center;
  position: relative;
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
.quantity-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 200px;
}

.card__price {
  grid-row: 2;
  grid-column: 3;
}
button {
  cursor: pointer;
  padding: 0.45rem;
  margin: 0;
  border-radius: 50%;
  aspect-ratio: 1;
  width: 2rem;
  height: 2rem;
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
  <div style="display: flex; flex-direction: row; align-items: center;">
    <span>qty: </span>
    <div class="quantity-box">
      <button onclick={subtract}>-</button>
      <span>{quantity}</span>
      <button onclick={add}>+</button>
    </div>
  </div>
  <p class="card__price">${item.finalPrice}</p>
</li>