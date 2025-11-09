<script lang="ts">
  import { getRecommendedProducts } from "../productService.mts";
  import type { Product } from "../types.mts";
  import ProductSummary from "./ProductSummary.svelte";
  import { onMount } from "svelte";

  let { productId } = $props();
  let recommendedProducts = $state<Product[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  onMount(async () => {
    try {
      const products = await getRecommendedProducts(productId);
      // Limit to 3 products as specified
      recommendedProducts = products.slice(0, 3);
    } catch (err: any) {
      error = err.message || "Failed to load recommended products";
    } finally {
      loading = false;
    }
  });
</script>

{#if !loading && !error && recommendedProducts.length > 0}
  <section class="recommended-products">
    <h2 class="recommended-products__title">Recommended Products</h2>
    <ul class="recommended-products__list">
      {#each recommendedProducts as product}
        <ProductSummary {product} />
      {/each}
    </ul>
  </section>
{/if}

<style>
  .recommended-products {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--light-grey, #ddd);
  }

  .recommended-products__title {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .recommended-products__list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>




