import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ui } from "../data/content";
export default function Layout() {
  const { language, setLanguage } = useLanguage();
  const t = ui[language];
  const [open, setOpen] = useState(false);
  const links = [
    ["/", t.home],
    ["/about", t.about],
    ["/services", t.services],
    ["/events", t.gallery],
    ["/contact", t.contact],
  ];
  return (
    <div className="app-shell">
      <div className="topbar">
        <div>☀️ Good Morning! 25°C</div>
        <div className="top-location">
          <MapPin size={16} /> Jashapar, Gujarat
        </div>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="gu">ગુજરાતી</option>
          <option value="hi">हिन्दी</option>
          <option value="en">English</option>
        </select>
      </div>
      <header className="header container">
        <Link to="/" className="brand">
          <img
            src="/images/logo.webp"
            alt="Jashapar Village Portal Logo"
            className="logo"
          />
          <div>
            <strong>Jashapar</strong>
            <span>Gram Panchayat</span>
          </div>
        </Link>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav open" : "nav"}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <div className="nav-more">
            <span>
              {t.services} <ChevronDown size={15} />
            </span>
            <div className="dropdown">
              <Link to="/businesses">{t.business}</Link>
              <Link to="/contacts">{t.contacts}</Link>
              <Link to="/bus-schedule">{t.bus}</Link>
              <Link to="/places">{t.places}</Link>
              <Link to="/managers">{t.managers}</Link>
              <Link to="/developer">{t.developer}</Link>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img
              src="/images/logo.webp"
              alt="Jashapar Village Portal Logo"
              className="footer-logo"
            />
            <div>
              <h3>Jashapar Gram Panchayat</h3>
              <p>All Information • One Place • Always Updated</p>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link to="/">{t.home}</Link>
            <Link to="/about">{t.about}</Link>
            <Link to="/services">{t.services}</Link>
            <Link to="/events">{t.gallery}</Link>
          </div>
          <div>
            <h4>Important</h4>
            <Link to="/managers">{t.managers}</Link>
            <Link to="/developer">{t.developer}</Link>
            <Link to="/privacy">{t.privacy}</Link>
            <Link to="/terms">{t.terms}</Link>
          </div>
          <div>
            <h4>Stay Connected</h4>
            <div className="socials">
              {/* <span>f</span> */}
              <a
                href="https://www.instagram.com/your_username"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
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
              </a>
              {/* <Phone /> */}
            </div>
            <p>Proud to be a Part of Jashapar ❤️</p>
          </div>
        </div>
        <div className="copyright">
          © 2026 Jashapar Village Portal. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
