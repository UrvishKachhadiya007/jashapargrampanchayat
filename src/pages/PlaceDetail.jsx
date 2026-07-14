import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Lightbox, ContactActions } from "../components/Common";
import { places } from "../data/content";
import { useLanguage, pick } from "../context/LanguageContext";

export default function PlaceDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [idx, setIdx] = useState(-1);

  const place = places.find((item) => item.id === id);

  if (!place) {
    return (
      <div className="container section">
        {language === "gu"
          ? "સ્થળ મળ્યું નથી."
          : language === "hi"
            ? "स्थान नहीं मिला।"
            : "Place not found."}
      </div>
    );
  }

  const photos = Array.isArray(place.photos) ? place.photos : [];

  const backText =
    language === "gu"
      ? "યાદગાર સ્થળો"
      : language === "hi"
        ? "यादगार स्थान"
        : "Memorable Places";

  const locationLabel =
    language === "gu"
      ? "સ્થાન"
      : language === "hi"
        ? "स्थान"
        : "Location";

  return (
    <section className="container detail-page">
      <Link to="/places">← {backText}</Link>

      <h1>{pick(place.name, language)}</h1>

      {place.category && (
        <span className="tag">
          {pick(place.category, language)}
        </span>
      )}

      {place.desc && (
        <p>{pick(place.desc, language)}</p>
      )}

      {place.location && pick(place.location, language) && (
        <p>
          <b>{locationLabel}:</b>{" "}
          {pick(place.location, language)}
        </p>
      )}

      {place.map && (
        <ContactActions map={place.map} />
      )}

      <div className="gallery-grid">
        {photos.map((image, index) => (
          <img
            key={`${place.id}-photo-${index}`}
            src={image}
            alt={`${pick(place.name, language)} ${index + 1}`}
            onClick={() => setIdx(index)}
          />
        ))}
      </div>

      <Lightbox
        images={photos}
        index={idx}
        onClose={() => setIdx(-1)}
      />
    </section>
  );
}