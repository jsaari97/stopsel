<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children, narrow = false }: { children: Snippet; narrow?: boolean } = $props();
</script>

<main class:narrow>
  {@render children()}
</main>

<style>
  main {
    width: 100%;
    max-width: var(--container-lg);
    min-height: 100svh;
    margin-inline: auto;
    padding: var(--spacing-5) var(--spacing-5) var(--spacing-10);
  }

  main.narrow {
    max-width: var(--container-md);
  }

  @media (min-width: 40rem) {
    main {
      padding: var(--spacing-8) var(--spacing-6) var(--spacing-16);
    }
  }
</style>
