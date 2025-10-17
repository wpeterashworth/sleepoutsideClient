<script lang="ts">
  import { getProducts } from "../productData.mts";
  import ProductSummary from "./ProductSummary.svelte";
  const { category } = $props();
  
  async function loadProducts() {
    try {
      return await getProducts(`products?category=${category}`);
    } catch (error) {
      throw `<p>There was an error loading products.</p><p>Click <a href="/">here</a> to go back to the homepage.</p>`;
    }
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
{:catch error}
  <p>{@html error}</p>
{/await}