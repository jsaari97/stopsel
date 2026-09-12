<script lang="ts">
  import BackLink from '$lib/components/public/BackLink.svelte';
  import PublicPage from '$lib/components/public/PublicPage.svelte';
</script>

<svelte:head>
  <title>Villkor för bidrag | Stöpsel</title>
  <meta name="description" content="Planerade villkor för bidrag till Stöpsel." />
</svelte:head>

<PublicPage>
  <BackLink />

  <article>
    <header>
      <p class="eyebrow">Utkast</p>
      <h1>Villkor för bidrag</h1>
      <p class="lead">De slutliga villkoren och textlicensen är ännu inte fastställda.</p>
    </header>

    <div class="notice" role="note">
      Stöpsel får inte ta emot bidrag innan den slutliga textlicensen, kontaktvägen och processen
      för återkallelse finns på den här sidan.
    </div>

    <section>
      <h2>Ditt eget svar</h2>
      <p>
        Du ska endast skicka text som du själv har skrivit. Texten ska inte avsiktligt innehålla en
        annan persons privata information.
      </p>
    </section>

    <section>
      <h2>Språklig variation</h2>
      <p>
        Olika ord, stavningar och meningsbyggnader är värdefulla. Ett bidrag behöver inte följa en
        formell stavningsregel.
      </p>
    </section>

    <section>
      <h2>Granskning och moderering</h2>
      <p>
        Andra användare ska kunna bedöma om ett svar låter naturligt för dialekten. Stöpsel ska
        kunna dölja eller ta bort spam, personuppgifter och olämpligt innehåll.
      </p>
    </section>

    <section>
      <h2>Användning av bidrag</h2>
      <p>
        Bidrag ska kunna användas för forskning, ordböcker, öppna data och språkteknik. De slutliga
        villkoren måste beskriva den exakta tillåtelsen innan insamlingen börjar.
      </p>
    </section>
  </article>
</PublicPage>

<style>
  article {
    max-width: var(--container-prose);
    margin: var(--spacing-6) auto 0;
  }

  header {
    margin-bottom: var(--spacing-6);
  }

  .eyebrow {
    color: var(--color-brand-action);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
  }

  h1 {
    margin-top: var(--spacing-1);
    color: var(--color-brand-ink);
    font-size: var(--text-4xl);
    line-height: var(--leading-4xl);
  }

  .lead {
    margin-top: var(--spacing-3);
    color: var(--color-brand-text-secondary);
    font-size: var(--text-lg);
  }

  .notice {
    margin-bottom: var(--spacing-8);
    padding: var(--spacing-4);
    border: var(--border-width-1) solid var(--color-brand-border);
    border-radius: var(--radius-xl);
    background: var(--color-brand-note);
  }

  section + section {
    margin-top: var(--spacing-8);
  }

  h2 {
    margin-bottom: var(--spacing-2);
    color: var(--color-brand-ink);
    font-size: var(--text-xl);
    line-height: var(--leading-xl);
  }

  section p {
    color: var(--color-brand-text-secondary);
  }
</style>
