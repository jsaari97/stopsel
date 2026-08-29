<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Administration | Stöpsel</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
  <header>
    <p class="text-sm font-medium text-slate-600">Stöpsel</p>
    <h1 class="text-3xl font-semibold text-slate-950">Administration</h1>
  </header>

  <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="text-lg font-semibold text-slate-950">Inloggad administratör</h2>
    <p class="mt-2 text-slate-700">{data.user.name} ({data.user.email})</p>
  </section>

  <form method="post" action="?/signOut" use:enhance>
    <Button type="submit">Logga ut</Button>
  </form>
</main>
