<script lang="ts">
  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();
</script>

<div class="public-root">
  {@render children()}
</div>

<style>
  .public-root {
    min-height: 100vh;
    background: var(--color-brand-page);
    color: var(--color-brand-ink);
  }
</style>
