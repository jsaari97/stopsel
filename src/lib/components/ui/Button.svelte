<script lang="ts">
  import { Button } from 'bits-ui';

  const baseClass =
    'min-h-11 rounded-md bg-slate-900 px-5 py-2.5 font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-50';

  let { children, class: className = '', ...restProps }: Button.RootProps = $props();
</script>

<Button.Root {...restProps} class={`${baseClass} ${className}`}>
  {@render children?.()}
</Button.Root>
