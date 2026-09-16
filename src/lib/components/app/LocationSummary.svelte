<script lang="ts">
  import { resolve } from '$app/paths';

  let {
    areaName,
    regionName,
    regionCode
  }: { areaName: string; regionName: string; regionCode: string } = $props();
</script>

<div class="location-summary">
  <span>{areaName} · {regionName}</span>
  <a
    href={resolve('/(public)/valj-dialekt/[regionCode]', { regionCode })}
    aria-label="Ändra dialekt"
  >
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 13.5-.5 3 3-.5L15 7.5 12.5 5 4 13.5Z" />
      <path d="m11 6.5 2.5 2.5" />
    </svg>
  </a>
</div>

<style>
  .location-summary {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-3);
    text-align: right;
  }

  span {
    overflow: hidden;
    color: var(--color-brand-ink);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a {
    padding: var(--spacing-2);
    margin: calc(var(--spacing-2) * -1);
    color: var(--color-brand-ink);
    text-decoration: none;
    border-radius: var(--radius-md);
    background: transparent;
  }

  a:hover {
    background: color-mix(in srgb, var(--color-brand-action) 16%, transparent);
  }

  a:focus-visible {
    border-radius: var(--radius-sm);
    outline: var(--border-width-2) solid var(--color-brand-ink);
    outline-offset: var(--border-width-2);
  }

  svg {
    width: var(--spacing-5);
    height: var(--spacing-5);
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.6;
  }
</style>
