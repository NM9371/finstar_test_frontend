import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyPage from './MyPage';
import AddObjectPage from './AddObjectPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MyPage />} />
        <Route path="/add" element={<AddObjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;