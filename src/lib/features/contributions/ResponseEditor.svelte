<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';

  let {
    responseText = $bindable(''),
    maximumLength,
    onContinue
  }: {
    responseText?: string;
    maximumLength: number;
    onContinue: () => void;
  } = $props();
</script>

<section aria-labelledby="response-heading">
  <h2 id="response-heading">Hur skulle du säga det?</h2>
  <label for="response-text">Ditt svar</label>
  <textarea
    id="response-text"
    bind:value={responseText}
    maxlength={maximumLength}
    rows="5"
    placeholder="Skriv här …"
    aria-describedby="response-help response-count"></textarea>
  <div class="field-meta">
    <p id="response-help">
      Skriv som du själv skulle säga det. Stavningen behöver inte vara perfekt.
    </p>
    <p id="response-count">{responseText.length}/{maximumLength}</p>
  </div>

  <Button type="button" fullWidth disabled={!responseText.trim()} onclick={onContinue}>
    Gå vidare
  </Button>
</section>

<style>
  section {
    margin-top: var(--spacing-6);
  }

  h2 {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  textarea {
    width: 100%;
    height: calc(var(--spacing-24) + var(--spacing-12));
    padding: var(--spacing-4);
    resize: vertical;
    border: var(--border-width-1) solid var(--color-brand-border);
    border-radius: var(--radius-xl);
    outline: 0;
    background: var(--color-brand-surface);
    color: var(--color-brand-ink);
    font-size: var(--text-lg);
    line-height: var(--leading-lg);
  }

  textarea:focus {
    border-color: var(--color-brand-ink);
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: var(--border-width-1);
  }

  textarea::placeholder {
    color: color-mix(in srgb, var(--color-brand-text-secondary) 60%, transparent);
  }

  .field-meta {
    display: grid;
    margin: var(--spacing-3) 0 var(--spacing-24);
    grid-template-columns: 1fr auto;
    gap: var(--spacing-3);
  }

  .field-meta p {
    color: var(--color-brand-text-secondary);
    font-size: var(--text-sm);
    line-height: var(--leading-sm);
  }

  .field-meta p:last-child {
    font-variant-numeric: tabular-nums;
  }
</style>
