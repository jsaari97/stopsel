<script lang="ts">
  import BackLink from '$lib/components/public/BackLink.svelte';
  import PublicPage from '$lib/components/public/PublicPage.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import type { ActionData, PageData } from './$types';

  let { data, form }: { data: PageData; form: ActionData } = $props();
  let query = $state('');
  let selectedAreaId = $state('');
  let normalizedQuery = $derived(query.trim().toLocaleLowerCase('sv'));
  let filteredAreas = $derived(
    data.region.areas.filter((area) => area.name.toLocaleLowerCase('sv').includes(normalizedQuery))
  );
</script>

<svelte:head>
  <title>Välj ort i {data.region.name} | Stöpsel</title>
  <meta name="description" content={`Välj den ort i ${data.region.name} som ligger närmast.`} />
</svelte:head>

<PublicPage>
  <BackLink to="dialect-regions" />

  <header>
    <h1>Välj ort</h1>
    <p>{data.region.name}</p>
  </header>

  <label class="search-label" for="area-search">Sök efter en ort</label>
  <div class="search-field">
    <span aria-hidden="true">⌕</span>
    <input id="area-search" type="search" placeholder="Sök ort …" bind:value={query} />
  </div>

  <form method="post">
    <fieldset>
      <legend>Orter i {data.region.name}</legend>
      <div class="area-list">
        {#each filteredAreas as area (area.id)}
          <label class:selected={selectedAreaId === String(area.id)}>
            <input
              type="radio"
              name="areaId"
              value={String(area.id)}
              bind:group={selectedAreaId}
              required
            />
            <span>{area.name}</span>
            <span class="marker" aria-hidden="true"></span>
          </label>
        {:else}
          <p class="empty">Ingen ort matchar din sökning.</p>
        {/each}
      </div>
    </fieldset>

    <div class="help">
      <p>Hittar du inte din ort?</p>
      <p>Välj den som ligger närmast.</p>
    </div>

    {#if form?.message}
      <p class="error" role="alert">{form.message}</p>
    {/if}

    <Button type="submit" fullWidth disabled={!selectedAreaId}>Fortsätt</Button>
  </form>
</PublicPage>

<style>
  header {
    margin: var(--spacing-6) 0 var(--spacing-4);
  }

  h1 {
    color: var(--color-brand-ink);
    font-size: var(--text-3xl);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--tracking-tight);
    line-height: var(--leading-3xl);
  }

  header p {
    color: var(--color-brand-text-secondary);
  }

  .search-label,
  legend {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .search-field {
    display: flex;
    align-items: center;
    min-height: var(--spacing-11);
    margin-bottom: var(--spacing-3);
    padding: 0 var(--spacing-3);
    border: var(--border-width-1) solid transparent;
    border-radius: var(--radius-xl);
    background: rgb(96 67 41 / 7%);
    gap: var(--spacing-2);
  }

  .search-field:focus-within {
    border-color: var(--color-brand-ink);
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: 0;
  }

  .search-field input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
  }

  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
  }

  .area-list {
    max-height: min(46svh, 26rem);
    overflow-y: auto;
    border: var(--border-width-1) solid var(--color-brand-border);
    border-radius: var(--radius-xl);
    background: rgb(255 255 255 / 34%);
  }

  .area-list label {
    display: grid;
    position: relative;
    align-items: center;
    min-height: 3.25rem;
    padding: var(--spacing-3) var(--spacing-4);
    cursor: pointer;
    grid-template-columns: 1fr auto;
    gap: var(--spacing-3);
  }

  .area-list label + label {
    border-top: var(--border-width-1) solid var(--color-brand-border);
  }

  .area-list label:hover,
  .area-list label.selected {
    background: var(--color-brand-note);
  }

  .area-list input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .area-list label:has(input:focus-visible) {
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: calc(-1 * var(--border-width-2));
  }

  .marker {
    width: var(--spacing-4);
    height: var(--spacing-4);
    border: var(--border-width-1) solid var(--color-brand-action);
    border-radius: var(--radius-full);
  }

  label.selected .marker {
    border: var(--border-width-4) solid var(--color-brand-action);
  }

  .empty {
    padding: var(--spacing-6) var(--spacing-4);
    color: var(--color-brand-text-secondary);
    text-align: center;
  }

  .help {
    margin: var(--spacing-5) 0;
    color: var(--color-brand-text-secondary);
    text-align: center;
  }

  .help p:first-child {
    color: var(--color-brand-ink);
    font-weight: var(--font-weight-medium);
  }

  .error {
    margin-bottom: var(--spacing-3);
    padding: var(--spacing-3);
    border-radius: var(--radius-md);
    background: var(--color-danger-surface);
    color: var(--color-danger-text);
  }
</style>
