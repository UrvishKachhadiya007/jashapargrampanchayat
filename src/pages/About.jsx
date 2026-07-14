import { useState } from "react";

import { Hero, Lightbox } from "../components/Common";
import { useLanguage, pick } from "../context/LanguageContext";
import { village, places } from "../data/content";

export default function About() {
  const { language } = useLanguage();
  const [idx, setIdx] = useState(-1);

  const aboutTitle =
    language === "gu"
      ? "આપણા ગામ વિશે"
      : language === "hi"
        ? "हमारे गांव के बारे में"
        : "About Our Village";

  const galleryTitle =
    language === "gu"
      ? "તસવીરોમાં આપણું ગામ"
      : language === "hi"
        ? "तस्वीरों में हमारा गांव"
        : "Our Village in Pictures";

  const agricultureText =
    language === "gu"
      ? "ખેતી ગામનો મુખ્ય વ્યવસાય છે અને ગામના લોકો એકતા તથા સહકારથી ગામના વિકાસ માટે કાર્ય કરે છે."
      : language === "hi"
        ? "कृषि गांव का मुख्य व्यवसाय है और गांव के लोग एकता तथा सहयोग से गांव के विकास के लिए कार्य करते हैं।"
        : "Agriculture is the main occupation, and the community works together with unity and cooperation for village development.";

  // માત્ર active places ની images galleryમાં બતાવશે
  const activePlaces = places.filter((place) => place.isActive !== false);

  const images = activePlaces
    .map((place) => place.cover)
    .filter(Boolean);

  return (
    <>
      <Hero
        title={aboutTitle}
        subtitle={pick(village.intro, language)}
        image="/images/hero-about.webp"
      />

      <section className="container about-layout">
        <article>
          <h2>{pick(village.name, language)}</h2>

          <p>{pick(village.intro, language)}</p>

          <p>{agricultureText}</p>
        </article>

        <div className="fact-grid">
          {village.facts.map(([label, value], index) => (
            <div key={`village-fact-${index}`}>
              <b>{pick(value, language)}</b>
              <span>{pick(label, language)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2>{galleryTitle}</h2>

        <div className="gallery-grid">
          {activePlaces.map((place, index) => (
            <img
              key={place.id || `place-image-${index}`}
              src={place.cover}
              alt={pick(place.name, language)}
              onClick={() => setIdx(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setIdx(index);
                }
              }}
            />
          ))}
        </div>
      </section>

      <Lightbox
        images={images}
        index={idx}
        onClose={() => setIdx(-1)}
      />
    </>
  );
}