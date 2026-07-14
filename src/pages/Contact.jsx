import { Hero, ProfileCard } from "../components/Common";
import { managers, ui } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { language } = useLanguage();
  const t = ui[language];

  const activeManagers = managers.filter(
    (manager) => manager.isActive !== false,
  );

  return (
    <>
      <Hero
        title={t.contactUs}
        subtitle={t.contactManagersSubtitle}
        image="/images/hero-managers.webp"
      />

      <section className="container profile-grid">
        {activeManagers.map((manager) => (
          <ProfileCard
            key={manager.id || manager.phone}
            person={manager}
          />
        ))}
      </section>
    </>
  );
}