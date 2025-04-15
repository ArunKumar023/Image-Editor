import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import EditPage from './EditPage';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;