<script lang="ts">
  import { untrack } from 'svelte';
  import AppFrame from '$lib/components/app/AppFrame.svelte';
  import PromptCard from '$lib/components/app/PromptCard.svelte';
  import ResponseConfirmation from '$lib/features/contributions/ResponseConfirmation.svelte';
  import ResponseEditor from '$lib/features/contributions/ResponseEditor.svelte';
  import type { PageProps } from './$types';

  let { data, form }: PageProps = $props();
  let responseText = $state(untrack(() => form?.responseText ?? ''));
  let step = $state<'write' | 'confirm'>(untrack(() => (form?.responseText ? 'confirm' : 'write')));

  function showConfirmation() {
    responseText = responseText.trim();
    step = 'confirm';
  }

  function showEditor() {
    step = 'write';
  }
</script>

<svelte:head>
  <title>Dagens mening | Stöpsel</title>
  <meta name="description" content="Skriv hur du skulle säga dagens mening på din dialekt." />
</svelte:head>

<AppFrame dialect={data.dialect} onBack={step === 'confirm' ? showEditor : undefined}>
  {#if step === 'write'}
    <section class="daily-prompt" aria-labelledby="daily-heading">
      <p class="eyebrow">Dagens mening</p>
      <h1 id="daily-heading">Hur säger du det här på din dialekt?</h1>
      <PromptCard text={data.prompt.text} />
    </section>

    <ResponseEditor
      bind:responseText
      maximumLength={data.maximumResponseLength}
      onContinue={showConfirmation}
    />
  {:else}
    <ResponseConfirmation
      {responseText}
      promptVersionId={data.prompt.promptVersionId}
      submissionEnabled={data.contributionsEnabled}
      message={form?.message}
      onEdit={showEditor}
    />
  {/if}
</AppFrame>

<style>
  .daily-prompt .eyebrow {
    margin-bottom: var(--spacing-2);
    color: var(--color-brand-action);
    font-size: var(--text-base);
    font-weight: var(--font-weight-semibold);
  }

  h1 {
    max-width: 18ch;
    margin-bottom: var(--spacing-8);
    color: var(--color-brand-ink);
    font-size: var(--text-3xl);
    letter-spacing: var(--tracking-tight);
    line-height: 1.15;
  }
</style>
