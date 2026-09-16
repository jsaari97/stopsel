<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';

  let {
    responseText,
    promptVersionId,
    submissionEnabled,
    message,
    onEdit
  }: {
    responseText: string;
    promptVersionId: number;
    submissionEnabled: boolean;
    message?: string;
    onEdit: () => void;
  } = $props();
</script>

<section aria-labelledby="confirmation-heading">
  <h1 id="confirmation-heading">Bekräfta ditt svar</h1>

  <div class="response-card">
    <p>{responseText}</p>
    <button type="button" onclick={onEdit} aria-label="Ändra svaret">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="m4 13.5-.5 3 3-.5L15 7.5 12.5 5 4 13.5Z" />
        <path d="m11 6.5 2.5 2.5" />
      </svg>
    </button>
  </div>

  <form method="post">
    <input type="hidden" name="promptVersionId" value={promptVersionId} />
    <input type="hidden" name="responseText" value={responseText} />
    <input type="hidden" name="ownText" value="yes" />
    <input type="hidden" name="noPrivateInformation" value="yes" />

    <div class="confirmations">
      <h2>Innan du skickar...</h2>
      <p>
        Genom att skicka in bekräftar du att texten är din egen och inte innehåller någon annans
        privata uppgifter.
      </p>
    </div>

    {#if message}
      <p class="error" role="alert">{message}</p>
    {/if}

    <Button type="submit" fullWidth disabled={!submissionEnabled}>Bekräfta och skicka</Button>
  </form>

  <p class="review-note">
    {submissionEnabled
      ? 'Ditt svar granskas innan det visas.'
      : 'Stöpsel tar inte emot bidrag ännu.'}
  </p>
</section>

<style>
  h1 {
    margin-bottom: var(--spacing-6);
    color: var(--color-brand-ink);
    font-size: var(--text-3xl);
    letter-spacing: var(--tracking-tight);
    line-height: 1.15;
  }

  .response-card {
    display: grid;
    min-height: 7rem;
    margin-bottom: var(--spacing-6);
    padding: var(--spacing-5);
    border: var(--border-width-1) solid var(--color-brand-border);
    border-radius: var(--radius-xl);
    background: var(--color-brand-surface);
    grid-template-columns: 1fr auto;
    gap: var(--spacing-3);
  }

  .response-card p {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
    white-space: pre-wrap;
  }

  .response-card button {
    display: grid;
    width: var(--spacing-10);
    height: var(--spacing-10);
    padding: 0;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-brand-ink);
    cursor: pointer;
    place-items: center;
  }

  .response-card button:hover {
    background: color-mix(in srgb, var(--color-brand-action) 10%, transparent);
  }

  .response-card button:focus-visible {
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: var(--border-width-2);
  }

  .response-card svg {
    width: var(--spacing-5);
    height: var(--spacing-5);
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.6;
  }

  .confirmations {
    display: grid;
    margin: var(--spacing-8) 0 var(--spacing-11);
    gap: var(--spacing-2);
  }

  .confirmations h2 {
    font-size: var(--text-lg);
    line-height: var(--leading-lg);
  }

  .confirmations p {
    color: var(--color-brand-text-secondary);
    font-size: var(--text-sm);
    line-height: var(--leading-sm);
  }

  .error {
    margin-bottom: var(--spacing-4);
    padding: var(--spacing-3);
    border-radius: var(--radius-md);
    background: var(--color-danger-surface);
    color: var(--color-danger-text);
  }

  .review-note {
    max-width: 34ch;
    margin: var(--spacing-4) auto 0;
    color: var(--color-brand-text-secondary);
    font-size: var(--text-sm);
    text-align: center;
  }
</style>
