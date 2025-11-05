<script lang="ts">
  import { getProducts } from "../productService.mts";
  import ProductSummary from "./ProductSummary.svelte";
  import Breadcrumb from "./Breadcrumb.svelte";
  import type { Product } from "../types.mts";
  const { category } = $props();

  async function loadProducts() {
    try {
      return await getProducts(`/products?category=${category}`);
    } catch (error) {
      throw `<p>There was an error loading products.</p><p>Click <a href="/">here</a> to go back to the homepage.</p>`;
    }
  }

  let serverResponse = $state(loadProducts());
  let sortBy = $state<'name' | 'price-low' | 'price-high'>('name');

  function sortProducts(products: Product[]): Product[] {
    const sortedProducts = [...products];

    switch (sortBy) {
      case 'name':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-low':
        return sortedProducts.sort((a, b) => a.finalPrice - b.finalPrice);
      case 'price-high':
        return sortedProducts.sort((a, b) => b.finalPrice - a.finalPrice);
      default:
        return sortedProducts;
    }
  }
</script>

{#await serverResponse}
<p>Loading...</p>
{:then serverResponse}
  <Breadcrumb category={category} count={serverResponse.results.length} />
  <div class="product-list-header">
    <h2>Top Products: {category}</h2>
    <div class="sort-controls">
      <label for="sort-select">Sort by:</label>
      <select id="sort-select" bind:value={sortBy}>
        <option value="name">Name</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  </div>
  <ul class="product-list">
    {#each sortProducts(serverResponse.results) as product}
      <ProductSummary product={product} />
    {/each}
  </ul>
{:catch error}
  <p>{@html error}</p>
{/await}