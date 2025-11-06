<script lang="ts">
  import { getProducts } from "../productService.mts";
  import ProductSummary from "./ProductSummary.svelte";
  import type { Product } from "../types.mts";
  import { onMount } from "svelte";

  let products: Product[] = [];
  let totalCount = 0;
  let searchTerm = '';
  let loading = true;
  let error: string | null = null;
  let sortBy: 'name' | 'price-low' | 'price-high' = 'name';

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    searchTerm = params.get('q') || '';

    if (!searchTerm) {
      error = "Please enter a search term.";
      loading = false;
      return;
    }

    try {
      const response = await getProducts(`/products?q=${encodeURIComponent(searchTerm)}`);
      totalCount = response.totalCount ?? response.results?.length ?? 0;
      products = response.results || response.data || [];
    } catch (err) {
      console.error(err);
      error = "Failed to fetch products. Please try again.";
    } finally {
      loading = false;
    }
  });

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

<main>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <h2>{error}</h2>
  {:else}
    <div class="product-list-header">
      <h1>Results for "{searchTerm}" ({totalCount})</h1>
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
      {#each sortProducts(products) as product}
        <ProductSummary {product} />
      {/each}
    </ul>
  {/if}
</main>

<style>
  main {
    padding: 1rem;
  }

  .product-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .product-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>
