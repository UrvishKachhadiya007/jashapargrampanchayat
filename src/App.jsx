import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Businesses from "./pages/Businesses";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Contacts from "./pages/Contacts";
import BusSchedule from "./pages/BusSchedule";
import Managers from "./pages/Managers";
import Developer from "./pages/Developer";
import Contact from "./pages/Contact";
import StaticPage from "./pages/StaticPage";
export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/places" element={<Places />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/bus-schedule" element={<BusSchedule />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/privacy"
            element={<StaticPage title="Privacy Policy" />}
          />
          <Route
            path="/terms"
            element={<StaticPage title="Terms & Conditions" />}
          />
          <Route path="*" element={<StaticPage title="Page Not Found" />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}
