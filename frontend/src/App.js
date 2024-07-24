import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLanding from './pages/MainLanding';
import AboutMe from './pages/AboutMe';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SummarizeStudio from './pages/SummarizeStudio';
import Navbar from './components/layout/Navbar/Navbar';
import './styles/global.scss';
import './styles/shared.scss';
import './styles/layout.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainLanding />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/summarize-studio" element={<SummarizeStudio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;