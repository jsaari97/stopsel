<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import HowItWorksDialog from '$lib/components/public/HowItWorksDialog.svelte';
</script>

<svelte:head>
  <title>Stöpsel</title>
  <meta
    name="description"
    content="Stöpsel samlar in nutida och vardagliga exempel på finlandssvenska dialekter."
  />
</svelte:head>

<main>
  <div class="title">
    <h1>Stöpsel</h1>
    <p>Så talar svenskfinland</p>
  </div>

  <div class="introduction">
    <h2>Hur säger du det<br />på din dialekt?</h2>
    <p>
      Hjälp oss samla in hur svenska talas runtom i Finland. Skriv som du själv skulle säga det. Det
      finns inget rätt sätt.
    </p>
  </div>

  <div class="controls">
    <Button href="/valj-dialekt" fullWidth>Kom igång</Button>
    <HowItWorksDialog />
  </div>
</main>

<style>
  main {
    display: flex;
    width: 100%;
    min-height: 100svh;
    max-width: var(--container-md);
    margin-inline: auto;
    padding: var(--spacing-12) var(--spacing-6);
    flex-direction: column;
    justify-content: center;
  }

  .title {
    margin-bottom: var(--spacing-8);
    text-align: center;
  }

  .title h1 {
    margin-bottom: var(--spacing-1-5);
    color: var(--color-brand-ink);
    font-size: clamp(var(--text-4xl), 12vw, var(--text-6xl));
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1;
  }

  .title p {
    color: var(--color-brand-text-secondary);
    font-size: var(--text-lg);
    font-weight: var(--font-weight-medium);
  }

  .introduction {
    margin-bottom: var(--spacing-8);
    text-align: center;
  }

  .introduction h2 {
    margin-bottom: var(--spacing-3);
    color: var(--color-brand-ink);
    font-size: var(--text-3xl);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1.2;
  }

  .introduction p {
    max-width: 34ch;
    margin: 0 auto;
    color: var(--color-brand-text-secondary);
    font-size: var(--text-base);
  }

  .controls {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    gap: var(--spacing-3);
  }
</style>
