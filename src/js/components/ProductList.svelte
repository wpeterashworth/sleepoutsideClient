<script lang="ts">
  import { getProducts } from "../productData.mts";
  import ProductSummary from "./ProductSummary.svelte";
  const { category } = $props();
  
  async function loadProducts() {
    return await getProducts(`products?category=${category}`);
  }

  let serverResponse = $state(loadProducts());
</script>

<h2>Top Products: {category}</h2>
{#await serverResponse}
<p>Loading...</p>
{:then serverResponse}
  <ul class="product-list">
    {#each serverResponse.results as product}
      <ProductSummary product={product} />
    {/each}
  </ul>
{/await}