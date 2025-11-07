<script lang="ts">
  let { product } = $props();
  
  const discountPercent = $derived(
    product.listPrice > product.finalPrice 
      ? Math.round(((product.listPrice - product.finalPrice) / product.listPrice) * 100)
      : 0
  );
  const hasDiscount = $derived(discountPercent > 0);
</script>


<li class="product-card">
  <a href="/product_pages/index.html?product={product.id}">
    {#if hasDiscount}
      <span class="product-card__discount-badge">-{discountPercent}%</span>
    {/if}
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

<style>
  .product-card {
    position: relative;
  }
  
  .product-card__discount-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: #e74c3c;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.875rem;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>