import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page";
import NewsPage from './components/news-page';
import EventsPage from './components/events-page';
import LoginPage from './components/login-page';
import SignInPage from './components/signin-page';
import TestPage from "./components/EventPage1";
import MainDashboard from './components/admin-dashboard/Main-Dashboard';

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
    </Routes>
  );
}

export default App;
