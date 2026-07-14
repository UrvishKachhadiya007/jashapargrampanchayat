import {
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  MapPin,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { useLanguage, pick } from "../context/LanguageContext";
import { ui } from "../data/content";
export function Hero({ title, subtitle, image, icon }) {
  return (
    <section className="page-hero container">
      <div className="hero-copy">
        <div className="hero-title-row">
          {icon && <span className="hero-icon">{icon}</span>}
          <h1>{title}</h1>
        </div>
        <p>{subtitle}</p>
      </div>
      <img src={image} alt="" />
    </section>
  );
}
export function SectionTitle({ title, link, label }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {link && <a href={link}>{label || "View All"} →</a>}
    </div>
  );
}
export function Lightbox({ images, index, onClose }) {
  const [i, setI] = useState(index);
  if (index < 0) return null;
  return (
    <div className="modal-overlay">
      <button className="modal-close" onClick={onClose}>
        <X />
      </button>
      <button
        className="light-arrow left"
        onClick={() => setI((i - 1 + images.length) % images.length)}
      >
        <ChevronLeft />
      </button>
      <img className="light-image" src={images[i]} alt="gallery" />
      <button
        className="light-arrow right"
        onClick={() => setI((i + 1) % images.length)}
      >
        <ChevronRight />
      </button>
      <div className="light-count">
        {i + 1} / {images.length}
      </div>
    </div>
  );
}
export function ContactActions({ phone, whatsapp, map, website }) {
  const { language } = useLanguage(),
    t = ui[language];
  return (
    <div className="action-row">
      {phone && (
        <a className="action-btn" href={`tel:${phone.replace(/\s/g, "")}`}>
          <Phone size={18} />
          {t.call}
        </a>
      )}
      {whatsapp && (
        <a
          className="action-btn secondary"
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
        >
          <MessageCircle size={18} />
          {t.whatsapp}
        </a>
      )}
      {map && (
        <a className="action-btn secondary" href={map} target="_blank">
          <MapPin size={18} />
          {t.directions}
        </a>
      )}
      {website && (
        <a className="action-btn secondary" href={website} target="_blank">
          <Globe size={18} />
          {t.website}
        </a>
      )}
    </div>
  );
}
// export function ProfileCard({ person, simple = false }) {
//   return (
//     <article className="profile-card">
//       <img src={person.photo} alt={person.name} />

//       <h3>{person.name}</h3>

//       {person.role && <p>{person.role}</p>}

//       <a href={`tel:${person.phone.replace(/\s/g, "")}`}>
//         <Phone size={17} />
//         {person.phone}
//       </a>

//       {person.instagram && (
//         <a
//           href={`https://www.instagram.com/${person.instagram.replace("@", "")}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label={`${person.name} Instagram`}
//         >
//           <svg
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             aria-hidden="true"
//           >
//             <rect x="2" y="2" width="20" height="20" rx="5" />
//             <circle cx="12" cy="12" r="4" />
//             <circle
//               cx="18"
//               cy="6"
//               r="1"
//               fill="currentColor"
//               stroke="none"
//             />
//           </svg>

//           {person.instagram}
//         </a>
//       )}
//     </article>
//   );
// }
export function ProfileCard({ person, simple = false }) {
  const { language } = useLanguage();

  const personName = pick(person.name, language);
  const personRole = pick(person.role, language);

  return (
    <article className="profile-card">
      <img src={person.photo} alt={personName} />

      <h3>{personName}</h3>

      {person.role && <p>{personRole}</p>}

      <a href={`tel:${person.phone.replace(/\s/g, "")}`}>
        <Phone size={17} />
        {person.phone}
      </a>

      {person.instagram && (
        <a
          href={`https://www.instagram.com/${person.instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${personName} Instagram`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle
              cx="18"
              cy="6"
              r="1"
              fill="currentColor"
              stroke="none"
            />
          </svg>

          {person.instagram}
        </a>
      )}
    </article>
  );
}
export function Empty({ text }) {
  return (
    <div className="empty-state">
      <div>🔎</div>
      <h3>{text}</h3>
    </div>
  );
}
