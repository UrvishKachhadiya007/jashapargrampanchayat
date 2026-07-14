export default function StaticPage({ title }) {
  return (
    <section className="container detail-page policy">
      <h1>{title}</h1>
      <p>
        This portal provides village information for public convenience.
        Information may be updated, corrected or removed when required.
      </p>
      <h2>Information and external links</h2>
      <p>
        Bus timings, phone numbers, business details and external gallery links
        should be verified before important use.
      </p>
      <h2>Privacy</h2>
      <p>
        The portal does not require public accounts and does not collect payment
        information. Contact information is displayed with consent for community
        use.
      </p>
      <h2>Corrections</h2>
      <p>
        Contact the Content Managers to report incorrect or outdated
        information.
      </p>
    </section>
  );
}
