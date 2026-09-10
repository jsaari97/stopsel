<script lang="ts">
  import { Button } from 'bits-ui';

  let { children, class: className = '', ...restProps }: Button.RootProps = $props();
</script>

<span class="root">
  <Button.Root {...restProps} class={className}>
    {@render children?.()}
  </Button.Root>
</span>

<style>
  .root {
    display: contents;
  }

  .root :global([data-button-root]) {
    min-height: var(--spacing-11);
    padding: var(--spacing-2-5) var(--spacing-5);
    border: 0;
    border-radius: var(--radius-md);
    background: var(--color-action);
    color: var(--color-on-action);
    font-weight: var(--font-weight-medium);
  }

  .root :global([data-button-root]:hover) {
    background: var(--color-action-hover);
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
