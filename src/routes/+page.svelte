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
    max-width: 42rem;
    margin-inline: auto;
    padding: 3rem 1.5rem;
    flex-direction: column;
    justify-content: center;
  }

  .eyebrow {
    color: #475569;
    font-size: 0.875rem;
    font-weight: 500;
  }

  h1 {
    margin-top: 0.5rem;
    color: #020617;
    font-size: 2.25rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  .introduction {
    max-width: 65ch;
    margin-top: 1.5rem;
    color: #334155;
    font-size: 1.125rem;
    line-height: 2rem;
  }

  .status {
    margin-top: 1rem;
    color: #475569;
  }

  @media (min-width: 40rem) {
    h1 {
      font-size: 3rem;
    }
  }
</style>
