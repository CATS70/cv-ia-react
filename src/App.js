import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CV from './components/Cv';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <div className="App">
		<main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cv" element={<CV />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;