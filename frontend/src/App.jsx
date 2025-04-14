import { Routes, Route } from 'react-router-dom';
import LandingPage from "./components/landing-page"
import NewsPage from './components/news-page';
import EventsPage from './components/events-page';
import LoginPage from './components/login-page';
import SignInPage from './components/signin-page';



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/news" element={<NewsPage />}/>
      <Route path="/events" element={<EventsPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignInPage />}/>
    </Routes>
  );
}

export default App;
