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
    min-height: var(--spacing-11);
    padding: var(--spacing-2-5) var(--spacing-5);
    border: 0;
    border-radius: var(--radius-md);
    background: var(--color-action);
    color: var(--color-on-action);
    cursor: pointer;
    font-weight: var(--font-weight-medium);
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
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: inset 0 0 0 var(--border-width-1) var(--color-border);
  }

  .root :global([data-button-root][data-variant='quiet']) {
    min-height: auto;
    padding: var(--spacing-2);
    background: transparent;
    color: var(--color-text-secondary);
  }

  .root :global([data-button-root]:hover) {
    background: var(--color-action-hover);
  }

  .root :global([data-button-root][data-variant='secondary']:hover),
  .root :global([data-button-root][data-variant='quiet']:hover) {
    background: color-mix(in srgb, var(--color-action) 8%, transparent);
  }

  .root :global([data-button-root]:focus-visible) {
    outline: var(--border-width-2) solid var(--color-focus);
    outline-offset: var(--border-width-2);
  }

  .root :global([data-button-root]:disabled) {
    cursor: not-allowed;
    opacity: var(--opacity-disabled);
  }
</style>
