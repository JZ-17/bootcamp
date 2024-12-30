import React from 'react';
import './App.css';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/editor" element={<CardEditor />} />
      <Route path="/viewer/:deckId" element={<CardViewer />} />
      <Route path="*" element={<div>Page not found!</div>} /> 
    </Routes>
  );
};

export default App;

