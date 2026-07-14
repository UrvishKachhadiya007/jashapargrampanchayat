import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { Hero, ContactActions, Empty } from "../components/Common";
import { businesses, ui } from "../data/content";
import { useLanguage, pick } from "../context/LanguageContext";

export default function Businesses() {
  const { language } = useLanguage();
  const t = ui[language];

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [cat, setCat] = useState("all");
  const [active, setActive] = useState(null);

  // Inactive businesses list અને filtersમાં દેખાશે નહીં
  const activeBusinesses = businesses.filter(
    (business) => business.isActive !== false,
  );

  // Actual business dataમાં રહેલી cities જ filterમાં દેખાશે
  const cities = [
    ...new Set(
      activeBusinesses
        .map((business) => pick(business.city, language))
        .filter(Boolean),
    ),
  ];

  // Actual business dataમાં રહેલી categories જ filterમાં દેખાશે
  const categories = [
    ...new Set(
      activeBusinesses
        .map((business) => pick(business.category, language))
        .filter(Boolean),
    ),
  ];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return activeBusinesses.filter((business) => {
      const ownerNames = business.owners
        .map((owner) => pick(owner.name, language))
        .join(" ");

      const services = Array.isArray(business.services)
        ? business.services
            .map((service) => pick(service, language))
            .join(" ")
        : "";

      const searchableText = [
        pick(business.name, language),
        pick(business.city, language),
        pick(business.category, language),
        pick(business.desc, language),
        ownerNames,
        services,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedQuery || searchableText.includes(normalizedQuery);

      const matchesCity =
        city === "all" || pick(business.city, language) === city;

      const matchesCategory =
        cat === "all" || pick(business.category, language) === cat;

      return matchesSearch && matchesCity && matchesCategory;
    });
  }, [query, city, cat, language, activeBusinesses]);

  return (
    <>
      <Hero
        title={t.business}
        subtitle={t.businessSubtitle}
        image="/images/hero-business.webp"
      />

      <section className="container filters">
        <input
          type="search"
          placeholder={t.businessSearchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select value={city} onChange={(event) => setCity(event.target.value)}>
          <option value="all">
            {t.all} {t.city}
          </option>

          {cities.map((cityName) => (
            <option value={cityName} key={cityName}>
              {cityName}
            </option>
          ))}
        </select>

        <select value={cat} onChange={(event) => setCat(event.target.value)}>
          <option value="all">
            {t.all} {t.category}
          </option>

          {categories.map((categoryName) => (
            <option value={categoryName} key={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </section>

      <section className="container card-grid">
        {filtered.map((business) => (
          <article className="business-card" key={business.id}>
            <img
              src={business.image}
              alt={pick(business.name, language)}
            />

            <div>
              <span className="tag">
                {pick(business.category, language)}
              </span>

              <h3>{pick(business.name, language)}</h3>

              <p>{pick(business.city, language)}</p>

              <p>{pick(business.desc, language)}</p>

              <button type="button" onClick={() => setActive(business)}>
                {t.viewDetails} →
              </button>
            </div>
          </article>
        ))}

        {!filtered.length && <Empty text={t.noBusinessesFound} />}
      </section>

      {active && (
        <div
          className="modal-overlay soft"
          role="presentation"
          onClick={() => setActive(null)}
        >
          <div
            className="detail-modal"
            role="dialog"
            aria-modal="true"
            aria-label={pick(active.name, language)}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="inside-close"
              onClick={() => setActive(null)}
              aria-label={t.close}
            >
              <X />
            </button>

            <div className="detail-head">
              <img
                src={active.image}
                alt={pick(active.name, language)}
              />

              <div>
                <span className="tag">
                  {pick(active.category, language)}
                </span>

                <h2>{pick(active.name, language)}</h2>

                <p>{pick(active.city, language)}</p>
              </div>
            </div>

            <p>{pick(active.desc, language)}</p>

            <h3>{t.owners}</h3>

            <div className="owner-row">
              {active.owners.map((owner, index) => (
                <div key={`${active.id}-owner-${index}`}>
                  <img
                    src={owner.photo}
                    alt={pick(owner.name, language)}
                  />

                  <b>{pick(owner.name, language)}</b>

                  {owner.role && (
                    <span>{pick(owner.role, language)}</span>
                  )}
                </div>
              ))}
            </div>

            {active.address && (
              <p>
                <b>{t.address}:</b>{" "}
                {pick(active.address, language)}
              </p>
            )}

            <ContactActions
              phone={active.phone}
              whatsapp={active.whatsapp}
              map={active.googleMapsUrl}
            />
          </div>
        </div>
      )}
    </>
  );
}