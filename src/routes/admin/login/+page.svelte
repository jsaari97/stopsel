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
    max-width: var(--container-md);
    margin-inline: auto;
    padding: var(--spacing-12) var(--spacing-6);
    flex-direction: column;
    justify-content: center;
  }

  .eyebrow {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--leading-sm);
  }

  h1 {
    margin-top: var(--spacing-1);
    color: var(--color-text);
    font-size: var(--text-3xl);
    font-weight: var(--font-weight-semibold);
    line-height: var(--leading-3xl);
  }

  form {
    display: flex;
    margin-top: var(--spacing-8);
    flex-direction: column;
    gap: var(--spacing-5);
  }

  label {
    display: flex;
    color: var(--color-text-label);
    font-weight: var(--font-weight-medium);
    flex-direction: column;
    gap: var(--spacing-2);
  }

  input {
    min-height: var(--spacing-11);
    padding: var(--spacing-2) var(--spacing-3);
    border: var(--border-width-1) solid var(--color-border-control);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    color: var(--color-text);
  }

  input:focus {
    border-color: var(--color-focus);
    outline: var(--border-width-2) solid var(--color-focus);
    outline-offset: 0;
  }

  [role='alert'] {
    padding: var(--spacing-3);
    border-radius: var(--radius-md);
    background: var(--color-danger-surface);
    color: var(--color-danger-text);
  }
</style>
