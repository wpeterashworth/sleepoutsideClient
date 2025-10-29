<script lang="ts">
  const { category, count } = $props<{ category: string; count?: number }>();

  // Format category name for display (e.g., "sleeping-bags" -> "Sleeping Bags")
  function formatCategory(cat: string): string {
    return cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
</script>

<nav class="breadcrumb" aria-label="breadcrumb">
  <a href="/">Home</a>
  <span class="separator">›</span>
  {#if count !== undefined}
    <a href="/product-list/?category={category}">{formatCategory(category)}</a>
    <span class="separator">›</span>
    <span class="current">({count} {count === 1 ? 'item' : 'items'})</span>
  {:else}
    <span class="current">{formatCategory(category)}</span>
  {/if}
</nav>
