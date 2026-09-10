<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title>Administratörsinloggning | Stöpsel</title>
</svelte:head>

<main>
  <p class="eyebrow">Stöpsel</p>
  <h1>Administratörsinloggning</h1>

  <form method="post" action="?/signIn" use:enhance>
    <label>
      E-postadress
      <input type="email" name="email" autocomplete="username" required />
    </label>

    <label>
      Lösenord
      <input type="password" name="password" autocomplete="current-password" required />
    </label>

    {#if form?.message}
      <p role="alert">{form.message}</p>
    {/if}

    <Button type="submit">Logga in</Button>
  </form>
</main>

<style>
  main {
    display: flex;
    min-height: 100vh;
    max-width: 28rem;
    margin-inline: auto;
    padding: 3rem 1.5rem;
    flex-direction: column;
    justify-content: center;
  }

  .eyebrow {
    color: #475569;
    font-size: 0.875rem;
    font-weight: 500;
  }

  h1 {
    margin-top: 0.25rem;
    color: #020617;
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 1.2;
  }

  form {
    display: flex;
    margin-top: 2rem;
    flex-direction: column;
    gap: 1.25rem;
  }

  label {
    display: flex;
    color: #1e293b;
    font-weight: 500;
    flex-direction: column;
    gap: 0.5rem;
  }

  input {
    min-height: 2.75rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid #94a3b8;
    border-radius: 0.375rem;
    background: #ffffff;
    color: #020617;
  }

  input:focus {
    border-color: #0f172a;
    outline: 2px solid #0f172a;
    outline-offset: 0;
  }

  [role='alert'] {
    padding: 0.75rem;
    border-radius: 0.375rem;
    background: #fef2f2;
    color: #991b1b;
  }
</style>
