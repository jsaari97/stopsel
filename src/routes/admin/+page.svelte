<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Administration | Stöpsel</title>
</svelte:head>

<main>
  <header>
    <p>Stöpsel</p>
    <h1>Administration</h1>
  </header>

  <section>
    <h2>Inloggad administratör</h2>
    <p>{data.user.name} ({data.user.email})</p>
  </section>

  <form method="post" action="?/signOut" use:enhance>
    <Button type="submit">Logga ut</Button>
  </form>
</main>

<style>
  main {
    display: flex;
    min-height: 100vh;
    max-width: var(--container-3xl);
    margin-inline: auto;
    padding: var(--spacing-12) var(--spacing-6);
    flex-direction: column;
    gap: var(--spacing-6);
  }

  header p {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--leading-sm);
  }

  h1 {
    color: var(--color-text);
    font-size: var(--text-3xl);
    font-weight: var(--font-weight-semibold);
    line-height: var(--leading-3xl);
  }

  section {
    padding: var(--spacing-6);
    border: var(--border-width-1) solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-xs);
  }

  h2 {
    color: var(--color-text);
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
    line-height: var(--leading-lg);
  }

  section p {
    margin-top: var(--spacing-2);
    color: var(--color-text-secondary);
  }
</style>
