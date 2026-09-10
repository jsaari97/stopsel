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
    min-height: 2.75rem;
    padding: 0.625rem 1.25rem;
    border: 0;
    border-radius: 0.375rem;
    background: #0f172a;
    color: #ffffff;
    font-weight: 500;
  }

  .root :global([data-button-root]:hover) {
    background: #334155;
  }

  .root :global([data-button-root]:focus-visible) {
    outline: 2px solid #0f172a;
    outline-offset: 2px;
  }

  .root :global([data-button-root]:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
