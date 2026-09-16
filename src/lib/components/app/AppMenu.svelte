<script lang="ts">
  import { resolve } from '$app/paths';
  import { Dialog } from 'bits-ui';
</script>

<Dialog.Root>
  <Dialog.Trigger class="app-menu-trigger" aria-label="Öppna meny">Stöpsel</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay class="app-menu-overlay" />
    <Dialog.Content class="app-menu-content">
      <Dialog.Close class="app-menu-close">Stäng</Dialog.Close>
      <Dialog.Title class="app-menu-title">Så fungerar Stöpsel</Dialog.Title>
      <Dialog.Description class="app-menu-description">
        Tre steg för att bidra med din dialekt.
      </Dialog.Description>

      <ol>
        <li><span>1</span>Välj var din dialekt hör hemma.</li>
        <li><span>2</span>Du får en kort mening.</li>
        <li><span>3</span>Skriv hur du själv skulle säga den.</li>
      </ol>

      <nav aria-label="Information">
        <a href={resolve('/(public)/integritet')}>Integritet</a>
        <a href={resolve('/(public)/villkor')}>Villkor för bidrag</a>
      </nav>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.app-menu-trigger) {
    display: inline-flex;
    width: auto;
    height: var(--spacing-11);
    padding: 0 var(--spacing-1);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-brand-ink);
    cursor: pointer;
    align-items: center;
    font-size: var(--text-xl);
    font-weight: var(--font-weight-bold);
  }

  :global(.app-menu-trigger:hover) {
    background: color-mix(in srgb, var(--color-brand-action) 16%, transparent);
  }

  :global(.app-menu-trigger:focus-visible),
  :global(.app-menu-close:focus-visible),
  :global(.app-menu-content a:focus-visible) {
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: var(--border-width-2);
  }

  :global(.app-menu-overlay) {
    position: fixed;
    z-index: 40;
    background: rgb(11 32 26 / 45%);
    inset: 0;
  }

  :global(.app-menu-content) {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    max-height: calc(100svh - var(--spacing-8));
    padding: var(--spacing-16) var(--spacing-6) var(--spacing-10);
    overflow-y: auto;
    border-radius: var(--radius-3xl) var(--radius-3xl) 0 0;
    background: var(--color-brand-page);
    color: var(--color-brand-ink);
    box-shadow: var(--shadow-xl);
  }

  :global(.app-menu-close) {
    position: absolute;
    top: var(--spacing-4);
    right: var(--spacing-5);
    min-height: var(--spacing-11);
    padding: var(--spacing-2);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-brand-ink);
    cursor: pointer;
    font: inherit;
  }

  :global(.app-menu-title) {
    display: block;
    font-size: var(--text-2xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-2xl);
  }

  :global(.app-menu-description) {
    margin-top: var(--spacing-2);
    color: var(--color-brand-text-secondary);
  }

  ol {
    display: grid;
    margin: var(--spacing-8) 0;
    padding: 0;
    gap: var(--spacing-4);
    list-style: none;
  }

  li {
    display: grid;
    align-items: center;
    grid-template-columns: var(--spacing-10) 1fr;
    gap: var(--spacing-3);
  }

  li span {
    display: grid;
    width: var(--spacing-8);
    height: var(--spacing-8);
    border-radius: var(--radius-full);
    background: var(--color-brand-action);
    color: var(--color-white);
    font-weight: var(--font-weight-semibold);
    place-items: center;
  }

  nav {
    display: flex;
    padding-top: var(--spacing-5);
    border-top: var(--border-width-1) solid var(--color-brand-border);
    flex-wrap: wrap;
    gap: var(--spacing-3) var(--spacing-5);
  }

  nav a {
    min-height: var(--spacing-11);
    padding: var(--spacing-2) 0;
    color: var(--color-brand-action);
    font-weight: var(--font-weight-medium);
  }

  @media (min-width: 40rem) {
    :global(.app-menu-content) {
      top: 50%;
      right: auto;
      bottom: auto;
      left: 50%;
      width: min(calc(100% - var(--spacing-8)), var(--container-md));
      border-radius: var(--radius-3xl);
      transform: translate(-50%, -50%);
    }
  }
</style>
