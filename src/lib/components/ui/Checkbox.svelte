<script lang="ts">
  import { Checkbox, Label, useId, type WithoutChildrenOrChild } from 'bits-ui';

  type Props = WithoutChildrenOrChild<Checkbox.RootProps> & {
    label: string;
  };

  let {
    id = useId(),
    checked = $bindable(false),
    label,
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

<div class="checkbox-field">
  <Checkbox.Root {id} bind:checked {...restProps} class={`checkbox ${className}`}>
    {#snippet children({ checked: isChecked })}
      {#if isChecked}
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m4.5 10 3.5 3.5 7.5-8" />
        </svg>
      {/if}
    {/snippet}
  </Checkbox.Root>
  <Label.Root for={id} class="checkbox-label">{label}</Label.Root>
</div>

<style>
  .checkbox-field {
    display: grid;
    align-items: start;
    grid-template-columns: var(--spacing-8) 1fr;
    gap: var(--spacing-2);
  }

  :global(.checkbox) {
    display: grid;
    width: var(--spacing-7, 1.75rem);
    height: var(--spacing-7, 1.75rem);
    padding: 0;
    border: var(--border-width-2) solid var(--color-brand-action);
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-white);
    cursor: pointer;
    place-items: center;
  }

  :global(.checkbox[data-state='checked']) {
    background: var(--color-brand-action);
  }

  :global(.checkbox:focus-visible) {
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: var(--border-width-2);
  }

  :global(.checkbox svg) {
    width: var(--spacing-5);
    height: var(--spacing-5);
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.25;
  }

  :global(.checkbox-label) {
    padding-top: var(--spacing-0-5);
    color: var(--color-brand-text-secondary);
    cursor: pointer;
    font-size: var(--text-base);
    line-height: var(--leading-base);
  }
</style>
