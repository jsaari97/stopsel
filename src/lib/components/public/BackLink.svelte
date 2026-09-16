<script lang="ts">
  import { resolve } from '$app/paths';

  type Destination = 'dialect-regions' | 'home';

  let { to = 'home', label = 'Tillbaka' }: { to?: Destination; label?: string } = $props();
</script>

{#snippet content()}
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m12.5 4.5-5.5 5.5 5.5 5.5" />
  </svg>
  <span>{label}</span>
{/snippet}

{#if to === 'dialect-regions'}
  <a href={resolve('/(public)/valj-dialekt')}>{@render content()}</a>
{:else}
  <a href={resolve('/')}>{@render content()}</a>
{/if}

<style>
  a {
    display: inline-flex;
    align-items: center;
    min-height: var(--spacing-11);
    margin-inline-start: calc(-1 * var(--spacing-3));
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-md);
    color: var(--color-brand-ink);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    gap: var(--spacing-1);
    text-decoration: none;
  }

  a:hover {
    background: color-mix(in srgb, var(--color-brand-action) 8%, transparent);
    color: var(--color-brand-ink);
  }

  a:focus-visible {
    outline: var(--border-width-2) solid var(--color-focus);
    outline-offset: var(--border-width-2);
  }

  svg {
    width: var(--spacing-5);
    height: var(--spacing-5);
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.75;
  }
</style>
