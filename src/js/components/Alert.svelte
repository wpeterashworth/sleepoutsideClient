<script lang="ts">
    import { onMount } from "svelte";
    import Alert from "../alert.mts";
    const props = $props();
    onMount(() => {
        new Alert(props).show();
    });
</script>