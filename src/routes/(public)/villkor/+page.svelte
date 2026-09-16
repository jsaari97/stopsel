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

    <section>
      <h2>Ditt eget svar</h2>
      <p>Skicka bara text som du själv har skrivit. Ta inte med privat information om andra.</p>
    </section>

    <section>
      <h2>Språklig variation</h2>
      <p>Olika ord, stavningar och meningsbyggnader är värdefulla.</p>
    </section>

    <section>
      <h2>Granskning och moderering</h2>
      <p>Andra kan bedöma om ett svar låter naturligt. Spam och olämpligt innehåll kan tas bort.</p>
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
