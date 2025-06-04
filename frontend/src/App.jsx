import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page";
import NewsPage from './components/news-page';
import EventsPage from './components/events-page';
import LoginPage from './components/login-page';
import SignInPage from './components/signin-page';
import TestPage from "./components/EventPage1";
import MainDashboard from './components/admin-dashboard/Main-Dashboard';
import AdminSettingPage from "./components/admin-dashboard/admin-sub-pages/admin-setting-page";
import AdminHelpPage from "./components/admin-dashboard/admin-sub-pages/admin-help-page";
import BrgyInformation from "./components/admin-dashboard/admin-dash-pages/brgy-information";
import BrgyNews from "./components/admin-dashboard/admin-dash-pages/brgy-news";
import BrgyResidents from "./components/admin-dashboard/admin-dash-pages/brgy-resident";
import BrgyInventory from "./components/admin-dashboard/admin-dash-pages/brgy-inventory";
import BrgyFeedback from "./components/admin-dashboard/admin-dash-pages/brgy-feedback";
import BrgyAnalytics from "./components/admin-dashboard/admin-dash-pages/brgy-analytics";
import BrgySettings from "./components/admin-dashboard/admin-dash-pages/brgy-settings";
import BrgySupport from "./components/admin-dashboard/admin-dash-pages/brgy-support";
import AdminPersonalPage from "./components/admin-dashboard/admin-sub-pages/admin-personal-page";
import BrgyResidentInfo from "./components/admin-dashboard/admin-residents-sub-pages/residents-sub-components.jsx/residents-view-all-info"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignInPage />} />
      <Route path="/dashboard" element={<MainDashboard />} />
      <Route path="/test" element={<TestPage />} />

      <Route path="/brgy-information" element={<BrgyInformation />} />
      <Route path="/brgy-information/personal/:id" element={<AdminPersonalPage />} />
      <Route path="/brgy-news" element={<BrgyNews />} />
      <Route path="/brgy-residents" element={<BrgyResidents />} />
      <Route path="/brgy-residents/personal/:id" element={<BrgyResidentInfo/>} />
      <Route path="/brgy-inventory" element={<BrgyInventory />} />
      <Route path="/brgy-feedback" element={<BrgyFeedback />} />
      <Route path="/brgy-analytics" element={<BrgyAnalytics />} />
      <Route path="/brgy-settings" element={<BrgySettings />} />
      <Route path="/brgy-support" element={<BrgySupport />} />

      <Route path="/settings" element={<AdminSettingPage />} />
      <Route path="/help" element={<AdminHelpPage />} />
    </Routes>
  );
}

export default App;
