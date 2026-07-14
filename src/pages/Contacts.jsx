import { useState } from "react";
import { X } from "lucide-react";

import { Hero, ContactActions } from "../components/Common";
import { contacts, ui } from "../data/content";
import { useLanguage, pick } from "../context/LanguageContext";

export default function Contacts() {
  const { language } = useLanguage();
  const t = ui[language];

  const [active, setActive] = useState(null);

  const activeContacts = contacts
    .filter((contact) => contact.isActive !== false)
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  const subtitle =
    language === "gu"
      ? "ગામના મુખ્ય લોકો અને જરૂરી સેવાઓના સંપર્ક સરળતાથી મેળવો."
      : language === "hi"
        ? "गांव के प्रमुख लोगों और आवश्यक सेवाओं के संपर्क आसानी से प्राप्त करें।"
        : "Quick access to key people and essential village services.";

  return (
    <>
      <Hero
        title={t.contacts}
        subtitle={subtitle}
        image="/images/hero-managers.webp"
      />

      <section className="container contact-grid">
        {activeContacts.map((contact) => {
          const contactName = pick(contact.name, language);
          const contactRole = pick(contact.role, language);

          return (
            <article
              className="contact-card"
              key={contact.id || contact.phone}
              onClick={() => setActive(contact)}
            >
              <img
                src={contact.photo}
                alt={contactName}
              />

              <div>
                <h3>{contactName}</h3>
                <p>{contactRole}</p>
                <span>{contact.phone}</span>
              </div>

              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                onClick={(event) => event.stopPropagation()}
              >
                ☎ {t.call}
              </a>
            </article>
          );
        })}
      </section>

      {active && (
        <div
          className="modal-overlay soft"
          onClick={() => setActive(null)}
        >
          <div
            className="contact-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="inside-close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X />
            </button>

            <img
              src={active.photo}
              alt={pick(active.name, language)}
            />

            <h2>{pick(active.name, language)}</h2>

            {active.role && (
              <p>{pick(active.role, language)}</p>
            )}

            <h3>{active.phone}</h3>

            <ContactActions
              phone={active.phone}
              whatsapp={
                active.whatsapp ||
                active.phone.replace(/\D/g, "")
              }
            />
          </div>
        </div>
      )}
    </>
  );
}