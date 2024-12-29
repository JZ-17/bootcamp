import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h2>Welcome to the Flashcards App</h2>
      <p>Select an option to get started:</p>
      <div>
        <Link to="/viewer">
          <button>Go to Card Viewer</button>
        </Link>
        <Link to="/editor">
          <button>Go to Card Editor</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
