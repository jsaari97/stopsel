<script lang="ts">
  let { text }: { text: string } = $props();
</script>

<blockquote>
  <span aria-hidden="true">“</span>{text}<span aria-hidden="true">”</span>
</blockquote>

<style>
  blockquote {
    position: relative;
    margin: 0;
    min-height: calc(var(--spacing-24) + var(--spacing-5));
    padding: var(--spacing-5);
    border: var(--border-width-1) solid var(--color-brand-border);
    border-radius: var(--radius-xl);
    background: var(--color-brand-surface);
    box-shadow: none;
    font-size: var(--text-xl);
    font-weight: var(--font-weight-semibold);
    line-height: 1.3;
  }
</style>
