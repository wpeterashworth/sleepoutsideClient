<script lang="ts">
  let { product } = $props();
</script>


<li class="product-card">
  <a href="/product_pages/index.html?product={product.id}">
    <img
      src="{product.images.primaryMedium}"
      alt="Image of {product.name}"/>
    <h3 class="card__brand">{product.brand.name}</h3>
    <h2 class="card__name">{product.nameWithoutBrand}</h2>
    <p class="product-card__price">${product.finalPrice}</p>
  </a>
</li>