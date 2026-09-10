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
    max-width: 48rem;
    margin-inline: auto;
    padding: 3rem 1.5rem;
    flex-direction: column;
    gap: 1.5rem;
  }

  header p {
    color: #475569;
    font-size: 0.875rem;
    font-weight: 500;
  }

  h1 {
    color: #020617;
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 1.2;
  }

  section {
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    background: #ffffff;
    box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
  }

  h2 {
    color: #020617;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75rem;
  }

  section p {
    margin-top: 0.5rem;
    color: #334155;
  }
</style>
