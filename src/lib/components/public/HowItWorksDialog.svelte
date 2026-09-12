<script lang="ts">
  import { Dialog } from 'bits-ui';
</script>

<Dialog.Root>
  <Dialog.Trigger class="trigger">Så fungerar det <span aria-hidden="true">→</span></Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay class="overlay" />
    <Dialog.Content class="content">
      <Dialog.Close class="close">Stäng</Dialog.Close>
      <Dialog.Title class="title">Så fungerar Stöpsel</Dialog.Title>
      <Dialog.Description class="description">
        Du hjälper oss att samla exempel på finlandssvenska dialekter.
      </Dialog.Description>

      <ol>
        <li><span>1</span>Välj var din dialekt hör hemma.</li>
        <li><span>2</span>Du får en kort mening.</li>
        <li><span>3</span>Skriv hur du själv skulle säga den.</li>
      </ol>

      <div class="note">
        <p>Skriv som det låter för dig.</p>
        <p>Stavningen behöver inte vara perfekt.</p>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.trigger) {
    display: inline-flex;
    align-items: center;
    min-height: var(--spacing-11);
    padding: var(--spacing-2) var(--spacing-3);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-brand-action);
    cursor: pointer;
    font: inherit;
    font-weight: var(--font-weight-medium);
    gap: var(--spacing-1);
  }

  :global(.trigger:hover) {
    background: color-mix(in srgb, var(--color-brand-action) 8%, transparent);
  }

  :global(.trigger:focus-visible),
  :global(.close:focus-visible) {
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: var(--border-width-2);
  }

  :global(.overlay) {
    position: fixed;
    z-index: 40;
    background: rgb(11 32 26 / 45%);
    inset: 0;
  }

  :global(.content) {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    max-height: calc(100svh - var(--spacing-8));
    padding: var(--spacing-12) var(--spacing-6) var(--spacing-10);
    overflow-y: auto;
    border-radius: var(--radius-3xl) var(--radius-3xl) 0 0;
    background: var(--color-brand-page);
    color: var(--color-brand-ink);
    box-shadow: var(--shadow-xl);
  }

  :global(.close) {
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

  :global(.title) {
    display: block;
    margin: 0;
    font-size: var(--text-2xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-2xl);
  }

  :global(.description) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  ol {
    display: grid;
    margin: var(--spacing-6) 0;
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

  .note {
    padding-top: var(--spacing-5);
    border-top: var(--border-width-1) solid var(--color-brand-border);
    text-align: center;
  }

  .note p {
    color: var(--color-brand-text-secondary);
  }

  @media (min-width: 40rem) {
    :global(.content) {
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
