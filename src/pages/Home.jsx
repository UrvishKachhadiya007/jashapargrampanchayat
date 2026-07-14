import { Link } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  Contact,
  Bus,
  MapPinned,
  Info,
  Database,
  Code2,
} from "lucide-react";
import { Hero, SectionTitle } from "../components/Common";
import { useLanguage, pick } from "../context/LanguageContext";
import {
  ui,
  village,
  businesses,
  events,
  buses,
  contacts,
  places,
} from "../data/content";
export default function Home() {
  const { language } = useLanguage(),
    t = ui[language];
  const services = [
    {
      title: t.about,
      description: t.aboutDesc,
      icon: Info,
      path: "/about",
      iconColor: "#2563EB",
      iconBg: "#EAF2FF",
    },
    {
      title: t.places,
      description: t.placesDesc,
      icon: MapPinned,
      path: "/places",
      iconColor: "#3A8D22",
      iconBg: "#EDF8E8",
    },
    {
      title: t.events,
      description: t.eventsDesc,
      icon: CalendarDays,
      path: "/events",
      iconColor: "#7C3AED",
      iconBg: "#F1EAFE",
    },
    {
      title: t.business,
      description: t.businessDesc,
      icon: Building2,
      path: "/businesses",
      iconColor: "#F05A19",
      iconBg: "#FFF0E8",
    },
    {
      title: t.bus,
      description: t.busDesc,
      icon: Bus,
      path: "/bus-schedule",
      iconColor: "#087F79",
      iconBg: "#E6F7F5",
    },
    {
      title: t.contacts,
      description: t.contactsDesc,
      icon: Contact,
      path: "/contacts",
      iconColor: "#C58A00",
      iconBg: "#FFF6DC",
    },
    {
      title: t.managers,
      description: t.managersDesc,
      icon: Database,
      path: "/managers",
      iconColor: "#089E91",
      iconBg: "#E5F8F5",
    },
    {
      title: t.developer,
      description: t.developerDesc,
      icon: Code2,
      path: "/developer",
      iconColor: "#7E3AC7",
      iconBg: "#F2E9FC",
    },
  ];
  return (
    <>
      <section className="home-hero container">
        <img src="/images/hero-home.webp" />
        <div className="home-overlay">
          <p>{t.welcomeTo}</p>
          <h1>{pick(village.heroTitle, language)}</h1>
          <p>{pick(village.heroText, language)}</p>
          <div>
            <Link className="primary" to="/services">
              {t.services}
            </Link>
            <Link className="ghost" to="/contacts">
              {t.contacts}
            </Link>
          </div>
        </div>
      </section>
      <section className="container section">
        <SectionTitle title={t.services} />
        <div className="service-grid">
          {services.map(
            ({ path, title, icon: Icon, description, iconColor, iconBg }) => (
              <Link className="service-card" to={path} key={path}>
                <span
                  className="service-icon"
                  style={{
                    color: iconColor,
                    backgroundColor: iconBg,
                  }}
                >
                  <Icon size={28} strokeWidth={2.2} />
                </span>

                <h3>{title}</h3>
                <p>{description}</p>
                <b>→</b>
              </Link>
            ),
          )}
        </div>
      </section>
      <section className="container section split-4">
        <div className="panel">
          <SectionTitle
            title={t.business}
            link="/businesses"
            label={t.viewAll}
          />
          {businesses.slice(0, 3).map((x) => (
            <Link to="/businesses" className="mini-row" key={x.id}>
              <img src={x.image} />
              <div>
                <b>{pick(x.name, language)}</b>
                <span>{pick(x.city, language)}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="panel">
          <SectionTitle title={t.bus} link="/bus-schedule" label={t.viewAll} />
          {buses.slice(0, 4).map((x, i) => (
            <div className="bus-mini" key={i}>
              <b>
                {pick(x.from, language)} → {pick(x.to, language)}
              </b>
              <span>{x.times[0]}</span>
            </div>
          ))}
        </div>
        <div className="panel">
          <SectionTitle title={t.events} link="/events" label={t.viewAll} />
          {events.slice(0, 3).map((x) => (
            <Link to={`/events/${x.id}`} className="mini-row" key={x.id}>
              <img src={x.cover} />
              <div>
                <b>{pick(x.name, language)}</b>
                <span>{x.date}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="panel">
          <SectionTitle title={t.contacts} link="/contacts" label={t.viewAll} />
          {contacts.slice(0, 4).map((x, i) => (
            <div className="contact-mini" key={i}>
              <img src={x.photo} />
              <div>
                <b>{pick(x.name, language)}</b>
                <span>{pick(x.role, language)}</span>
              </div>
              <a href={`tel:${x.phone}`}>☎</a>
            </div>
          ))}
        </div>
      </section>
      <section className="container about-preview">
        <div>
          <h2>{t.about}</h2>
          <p>{pick(village.intro, language)}</p>
          <Link className="primary" to="/about">
            {t.viewDetails}
          </Link>
        </div>
        <div className="preview-gallery">
          {places.slice(0, 3).map((x) => (
            <img key={x.id} src={x.cover} />
          ))}
        </div>
      </section>
    </>
  );
}
