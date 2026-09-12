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
    background:
      radial-gradient(circle at 20% 10%, rgb(255 255 255 / 70%), transparent 28rem),
      var(--color-brand-page);
    color: var(--color-brand-ink);
  }
</style>
