<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title>Administratörsinloggning | Stöpsel</title>
</svelte:head>

<main class="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
  <p class="text-sm font-medium text-slate-600">Stöpsel</p>
  <h1 class="mt-1 text-3xl font-semibold text-slate-950">Administratörsinloggning</h1>

  <form method="post" action="?/signIn" use:enhance class="mt-8 flex flex-col gap-5">
    <label class="flex flex-col gap-2 font-medium text-slate-800">
      E-postadress
      <input
        type="email"
        name="email"
        autocomplete="username"
        required
        class="min-h-11 rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-950 focus:border-slate-900 focus:ring-2 focus:ring-slate-900"
      />
    </label>

    <label class="flex flex-col gap-2 font-medium text-slate-800">
      Lösenord
      <input
        type="password"
        name="password"
        autocomplete="current-password"
        required
        class="min-h-11 rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-950 focus:border-slate-900 focus:ring-2 focus:ring-slate-900"
      />
    </label>

    {#if form?.message}
      <p role="alert" class="rounded-md bg-red-50 p-3 text-red-800">{form.message}</p>
    {/if}

    <Button type="submit">Logga in</Button>
  </form>
</main>
