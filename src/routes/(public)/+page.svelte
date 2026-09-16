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

  <div class="dialect-notes" aria-hidden="true">
    <span>“he va naa”</span>
    <span>“kva säir di?”</span>
    <span>“gårr kålkkå bra!”</span>
  </div>

  <div class="introduction">
    <h2>Hur säger du det<br />på din dialekt?</h2>
    <p>
      Hjälp oss samla in hur svenska talas<br />runtom i Finland.<br />Skriv som du själv skulle
      säga det.<br />Det finns inget rätt sätt.
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
    padding: var(--spacing-20) var(--spacing-5) var(--spacing-10);
    flex-direction: column;
  }

  .title {
    margin-bottom: var(--spacing-8);
    text-align: center;
  }

  .title h1 {
    margin-bottom: var(--spacing-1-5);
    color: var(--color-brand-ink);
    font-size: var(--text-5xl);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--tracking-tight);
    line-height: 1;
  }

  .title p {
    color: var(--color-brand-text-secondary);
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
  }

  .dialect-notes {
    position: relative;
    height: calc(var(--spacing-20) + var(--spacing-24));
  }

  .dialect-notes span {
    display: grid;
    position: absolute;
    width: 64%;
    height: var(--spacing-12);
    border-radius: var(--radius-md);
    color: var(--color-brand-ink);
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
    place-items: center;
  }

  .dialect-notes span:nth-child(1) {
    top: var(--spacing-5);
    left: var(--spacing-3);
    background: #f5e5d3;
    transform: rotate(-5deg);
  }

  .dialect-notes span:nth-child(2) {
    top: var(--spacing-16);
    right: var(--spacing-4);
    background: var(--color-brand-note);
    transform: rotate(5deg);
  }

  .dialect-notes span:nth-child(3) {
    bottom: var(--spacing-2);
    left: var(--spacing-6);
    background: #f5e5d3;
    transform: rotate(-5deg);
  }

  .introduction {
    margin-bottom: var(--spacing-10);
    text-align: center;
  }

  .introduction h2 {
    margin-bottom: var(--spacing-1);
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

  @media (max-height: 47rem) {
    main {
      padding-top: var(--spacing-8);
    }

    .dialect-notes {
      height: calc(var(--spacing-16) + var(--spacing-20));
    }
  }
</style>
