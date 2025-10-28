<script lang="ts">
  let { product } = $props();
</script>


<li class="product-card">
  <a href="/product_pages/index.html?product={product.id}">
    <img
      src="{product.images.primaryMedium}"
      srcset="{product.images.primarySmall} 500w, {product.images.primaryMedium} 800w, {product.images.primaryLarge} 1200w"
      sizes="(max-width: 500px) 100vw, (max-width: 800px) 50vw, 33vw"
      alt="Image of {product.name}"/>
    <h3 class="card__brand">{product.brand.name}</h3>
    <h2 class="card__name">{product.nameWithoutBrand}</h2>
    <p class="product-card__price">${product.finalPrice}</p>
  </a>
</li>