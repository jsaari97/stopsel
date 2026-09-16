<script lang="ts">
  import BackLink from '$lib/components/public/BackLink.svelte';
  import PublicPage from '$lib/components/public/PublicPage.svelte';
</script>

<svelte:head>
  <title>Integritet | Stöpsel</title>
  <meta name="description" content="Information om hur Stöpsel ska hantera personuppgifter." />
</svelte:head>

<PublicPage>
  <BackLink />

  <article>
    <header>
      <p class="eyebrow">Utkast</p>
      <h1>Integritet</h1>
      <p class="lead">Den här sidan är inte den slutliga integritetsinformationen.</p>
    </header>

    <section>
      <h2>Utan konto, men inte anonymt</h2>
      <p>
        Du kan bidra utan konto. En privat kod kopplar ihop dina bidrag. Uppgifterna är pseudonyma,
        inte anonyma.
      </p>
    </section>

    <section>
      <h2>Planerade uppgifter</h2>
      <p>
        Tjänsten lagrar dialektområde, svarstext, tid och uppgifter för granskning och moderering.
      </p>
    </section>

    <section>
      <h2>Dina bidrag</h2>
      <p>Du kan se och ta bort bidrag som hör till din privata kod.</p>
    </section>
  </article>
</PublicPage>

<style>
  article {
    max-width: var(--container-prose);
    margin: var(--spacing-4) auto 0;
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
