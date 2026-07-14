import { Hero, ProfileCard } from "../components/Common";
import { developers, ui } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function Developer() {
  const { language } = useLanguage();
  const t = ui[language];

  const activeDevelopers = developers.filter(
    (developer) => developer.isActive !== false,
  );

  return (
    <>
      <Hero
        title={t.developer}
        subtitle={t.developerSubtitle}
        image="/images/hero-developer.webp"
      />

      <section className="container profile-grid single">
        {activeDevelopers.map((developer) => (
          <ProfileCard
            key={developer.id || developer.phone}
            person={developer}
          />
        ))}
      </section>
    </>
  );
}