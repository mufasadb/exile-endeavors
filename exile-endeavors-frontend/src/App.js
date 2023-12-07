import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import DiscordLoginButton from './components/DiscordLoginButton';
import DiscordCallbackPage from './components/DiscordCallbackPage';

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<DiscordLoginButton />} />
        <Route
          path='/auth/discord/callback'
          element={<DiscordCallbackPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
