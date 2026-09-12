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

    <div class="notice" role="note">
      Stöpsel får inte öppnas för bidrag innan ansvarig organisation, kontaktväg, rättslig grund och
      lagringstider finns på den här sidan.
    </div>

    <section>
      <h2>Utan konto, men inte anonymt</h2>
      <p>
        Du ska kunna bidra utan ett konto. En privat kod i din webbläsare ska koppla ihop dina
        bidrag och granskningar. Uppgifterna är därför pseudonyma. De är inte anonyma.
      </p>
    </section>

    <section>
      <h2>Planerade uppgifter</h2>
      <p>
        Tjänsten ska lagra ditt dialektområde, din svarstext, tidpunkten för bidraget och uppgifter
        som behövs för granskning och moderering.
      </p>
    </section>

    <section>
      <h2>Dina bidrag</h2>
      <p>
        Du ska kunna se och ta bort bidrag som hör till din privata kod. En återställningskod ska
        kunna ge åtkomst från en annan webbläsare. Den koden måste behandlas som en hemlighet.
      </p>
    </section>

    <section>
      <h2>Framtida publicering</h2>
      <p>
        En framtida offentlig korpus får inte innehålla gästidentifierare, e-postadresser, råa
        IP-adresser eller modereringshistorik. En sådan publicering kräver egna villkor och en
        dokumenterad integritetskontroll.
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
