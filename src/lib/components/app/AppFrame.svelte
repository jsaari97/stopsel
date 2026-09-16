<script lang="ts">
  import type { Snippet } from 'svelte';
  import AppMenu from './AppMenu.svelte';
  import LocationSummary from './LocationSummary.svelte';

  type Dialect = {
    name: string;
    region: { code: string; name: string };
  };

  let { children, dialect, onBack }: { children: Snippet; dialect: Dialect; onBack?: () => void } =
    $props();
</script>

<div class="app-root">
  <main>
    <header class="app-bar">
      {#if onBack}
        <button class="back" type="button" onclick={onBack}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="m12.5 4.5-5.5 5.5 5.5 5.5" />
          </svg>
          <span>Tillbaka</span>
        </button>
      {:else}
        <AppMenu />
      {/if}

      <LocationSummary
        areaName={dialect.name}
        regionName={dialect.region.name}
        regionCode={dialect.region.code}
      />
    </header>

    <div class="content">
      {@render children()}
    </div>
  </main>
</div>

<style>
  .app-root {
    min-height: 100svh;
    background: var(--color-brand-page);
    color: var(--color-brand-ink);
  }

  main {
    width: 100%;
    max-width: var(--container-lg);
    min-height: 100svh;
    margin-inline: auto;
    padding: var(--spacing-4) var(--spacing-5) var(--spacing-16);
  }

  .app-bar {
    display: grid;
    align-items: center;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--spacing-4);
  }

  .back {
    display: inline-flex;
    align-items: center;
    min-height: var(--spacing-11);
    margin-left: calc(-1 * var(--spacing-2));
    padding: var(--spacing-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-brand-ink);
    cursor: pointer;
    gap: var(--spacing-1);
  }

  .back:hover {
    background: color-mix(in srgb, var(--color-brand-action) 8%, transparent);
  }

  .back:focus-visible {
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: var(--border-width-2);
  }

  .back svg {
    width: var(--spacing-5);
    height: var(--spacing-5);
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.75;
  }

  .content {
    margin-top: var(--spacing-10);
  }

  @media (min-width: 40rem) {
    main {
      padding: var(--spacing-6) var(--spacing-8) var(--spacing-16);
    }

    .content {
      margin-top: var(--spacing-8);
    }
  }
</style>
