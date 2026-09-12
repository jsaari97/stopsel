<script lang="ts">
  import { resolve } from '$app/paths';
  import BackLink from '$lib/components/public/BackLink.svelte';
  import PublicPage from '$lib/components/public/PublicPage.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Välj dialektområde | Stöpsel</title>
  <meta name="description" content="Välj det område där din finlandssvenska dialekt hör hemma." />
</svelte:head>

<PublicPage>
  <BackLink />

  <header>
    <h1>Varifrån kommer<br />din dialekt?</h1>
    <p>Välj det område som passar bäst. Du kan välja ort efteråt.</p>
  </header>

  <nav class="region-list" aria-label="Dialektområden">
    {#each data.regions as region (region.code)}
      <a href={resolve('/(public)/valj-dialekt/[regionCode]', { regionCode: region.code })}>
        <span>{region.name}</span>
        <span aria-hidden="true">›</span>
      </a>
    {/each}
  </nav>

  <div class="help">
    <p>Hittar du inte ditt område?</p>
    <p>Välj det som ligger närmast.</p>
  </div>
</PublicPage>

<style>
  header {
    margin: var(--spacing-6) 0 var(--spacing-5);
  }

  h1 {
    color: var(--color-brand-ink);
    font-size: var(--text-3xl);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.15;
  }

  header p {
    max-width: 31ch;
    margin-top: var(--spacing-3);
    color: var(--color-brand-text-secondary);
  }

  .region-list {
    overflow: hidden;
    border: var(--border-width-1) solid var(--color-brand-border);
    border-radius: var(--radius-xl);
    background: rgb(255 255 255 / 34%);
  }

  .region-list a {
    display: flex;
    align-items: center;
    min-height: 3.25rem;
    padding: var(--spacing-3) var(--spacing-4);
    color: var(--color-brand-ink);
    justify-content: space-between;
    text-decoration: none;
  }

  .region-list a + a {
    border-top: var(--border-width-1) solid var(--color-brand-border);
  }

  .region-list a:hover {
    background: color-mix(in srgb, var(--color-brand-action) 10%, transparent);
  }

  .region-list a:focus-visible {
    position: relative;
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: calc(-1 * var(--border-width-2));
  }

  .region-list a span:last-child {
    font-size: var(--text-2xl);
    line-height: 1;
  }

  .help {
    margin-top: var(--spacing-8);
    color: var(--color-brand-text-secondary);
    text-align: center;
  }

  .help p:first-child {
    color: var(--color-brand-ink);
    font-weight: var(--font-weight-medium);
  }
</style>
