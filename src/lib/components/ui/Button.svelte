<script lang="ts">
  import { Button } from 'bits-ui';

  type Props = Button.RootProps & {
    fullWidth?: boolean;
    variant?: 'primary' | 'secondary' | 'quiet';
  };

  let {
    children,
    class: className = '',
    fullWidth = false,
    variant = 'primary',
    ...restProps
  }: Props = $props();
</script>

<span class="root">
  <Button.Root
    {...restProps}
    class={className}
    data-full-width={fullWidth || undefined}
    data-variant={variant}
  >
    {@render children?.()}
  </Button.Root>
</span>

<style>
  .root {
    display: contents;
  }

  .root :global([data-button-root]) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--spacing-12);
    padding: var(--spacing-3) var(--spacing-5);
    border: 0;
    border-radius: var(--radius-md);
    background: var(--color-brand-action);
    color: var(--color-on-action);
    cursor: pointer;
    font-weight: var(--font-weight-semibold);
    text-align: center;
    text-decoration: none;
    transition:
      background var(--duration-fast) var(--ease-standard),
      color var(--duration-fast) var(--ease-standard);
  }

  .root :global([data-button-root][data-full-width]) {
    width: 100%;
  }

  .root :global([data-button-root][data-variant='secondary']) {
    background: var(--color-brand-surface);
    color: var(--color-brand-ink);
    box-shadow: none;
  }

  .root :global([data-button-root][data-variant='quiet']) {
    min-height: auto;
    padding: var(--spacing-2);
    background: transparent;
    color: var(--color-brand-text-secondary);
  }

  .root :global([data-button-root]:hover) {
    background: var(--color-brand-action-hover);
  }

  .root :global([data-button-root][data-variant='secondary']:hover),
  .root :global([data-button-root][data-variant='quiet']:hover) {
    background: color-mix(in srgb, var(--color-brand-action) 10%, var(--color-brand-surface));
  }

  .root :global([data-button-root]:focus-visible) {
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: var(--border-width-2);
  }

  .root :global([data-button-root]:disabled) {
    cursor: not-allowed;
    opacity: var(--opacity-disabled);
  }
</style>
