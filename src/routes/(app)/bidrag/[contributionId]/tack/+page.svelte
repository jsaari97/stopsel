<script lang="ts">
  import { resolve } from '$app/paths';
  import AppFrame from '$lib/components/app/AppFrame.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Tack för ditt bidrag | Stöpsel</title>
  <meta name="description" content="Tack för att du bidrog med ett dialektsvar." />
</svelte:head>

<AppFrame dialect={data.dialect}>
  <div class="thank-you">
    <div class="note" aria-hidden="true">Tack!</div>

    <h1>Ditt svar är skickat</h1>
    <p class="lead">Ditt svar hjälper oss att förstå hur svenska talas runtom i Finland.</p>

    <div class="participation">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="m8 40 9-25 17 17-26 8Z" />
        <path d="m13 28 7 7M17 20l12 12M27 12l2-5M34 17l5-3M33 24l7 1M21 13l-1-5" />
      </svg>
      <div>
        <strong>Du har bidragit</strong>
        <strong>
          under {data.contribution.contributionDays}
          {data.contribution.contributionDays === 1 ? 'dag!' : 'dagar!'}
        </strong>
      </div>
    </div>

    <div class="actions">
      <Button href="/dagens-mening" fullWidth>Se fler svar</Button>
      <Button href="/dagens-mening" variant="secondary" fullWidth>Svara på en till mening</Button>
    </div>
  </div>

  <nav class="bottom-nav" aria-label="Huvudmeny">
    <a href={resolve('/')}>Hem</a>
    <a href={resolve('/(app)/dagens-mening')}>Mina bidrag</a>
    <a href={resolve('/(public)/integritet')}>Mer</a>
  </nav>
</AppFrame>

<style>
  .thank-you {
    padding-top: 0;
    text-align: center;
  }

  .note {
    display: inline-block;
    width: calc(var(--spacing-32) + var(--spacing-8));
    height: var(--spacing-20);
    margin: 0 0 var(--spacing-10);
    padding: var(--spacing-4) var(--spacing-8);
    border-radius: var(--radius-md);
    background: var(--color-brand-note);
    box-shadow: none;
    font-size: var(--text-4xl);
    font-weight: var(--font-weight-semibold);
    line-height: 1.3;
    transform: rotate(-5deg);
  }

  h1 {
    margin-bottom: var(--spacing-3);
    color: var(--color-brand-ink);
    font-size: var(--text-3xl);
    letter-spacing: var(--tracking-tight);
    line-height: 1.15;
  }

  .lead {
    max-width: 31ch;
    margin: 0 auto var(--spacing-10);
    color: var(--color-brand-text-secondary);
    font-size: var(--text-lg);
  }

  .participation {
    display: inline-grid;
    width: 100%;
    margin-bottom: var(--spacing-10);
    padding: var(--spacing-4) var(--spacing-5);
    border-radius: var(--radius-xl);
    background: #d9ebdd;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-4);
    text-align: left;
  }

  .participation svg {
    width: 3rem;
    height: 3rem;
    fill: none;
    stroke: var(--color-brand-ink);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.7;
  }

  .participation strong {
    display: block;
    color: var(--color-brand-ink);
    font-size: var(--text-xl);
    line-height: 1.05;
  }

  .actions {
    display: grid;
    gap: var(--spacing-3);
  }

  .bottom-nav {
    display: grid;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: var(--spacing-16);
    padding: var(--spacing-3) var(--spacing-5);
    background: var(--color-brand-surface);
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
  }

  .bottom-nav a {
    color: var(--color-brand-ink);
    font-size: var(--text-xs);
    font-weight: var(--font-weight-semibold);
    text-decoration: none;
  }
</style>
