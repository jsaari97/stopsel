<svelte:head>
  <title>Stöpsel</title>
  <meta
    name="description"
    content="Stöpsel samlar in nutida och vardagliga exempel på finlandssvenska dialekter."
  />
</svelte:head>

<main>
  <p class="eyebrow">Finlandssvenska dialekter</p>
  <h1>Stöpsel</h1>
  <p class="introduction">
    Här kommer du att kunna dela hur du naturligt säger vardagliga saker på din dialekt.
  </p>
  <p class="status">Tjänsten är under utveckling.</p>
</main>

<style>
  main {
    display: flex;
    min-height: 100vh;
    max-width: var(--container-2xl);
    margin-inline: auto;
    padding: var(--spacing-12) var(--spacing-6);
    flex-direction: column;
    justify-content: center;
  }

  .eyebrow {
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--leading-sm);
  }

  h1 {
    margin-top: var(--spacing-2);
    color: var(--color-text);
    font-size: var(--text-4xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--tracking-tight);
    line-height: var(--leading-4xl);
  }

  .introduction {
    max-width: var(--container-prose);
    margin-top: var(--spacing-6);
    color: var(--color-text-secondary);
    font-size: var(--text-lg);
    line-height: var(--leading-2xl);
  }

  .status {
    margin-top: var(--spacing-4);
    color: var(--color-text-muted);
  }

  @media (min-width: 40rem) {
    h1 {
      font-size: var(--text-5xl);
      line-height: var(--leading-5xl);
    }
  }
</style>
