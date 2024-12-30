import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from './index';
import './App.css';

const Homepage = () => {
  const [decks, setDecks] = useState({});

  useEffect(() => {
    const fetchDecks = async () => {
      const homepageRef = ref(database, '/homepage');
      const snapshot = await get(homepageRef);
      if (snapshot.exists()) {
        setDecks(snapshot.val());
      }
    };

    fetchDecks();
  }, []);

  return (
    <div className="container">
      <h2>Welcome to the Flashcards App</h2>
      <div>
        <Link to="/editor">
          <button>Create New Deck</button>
        </Link>
      </div>
      <h3>Available Decks</h3>
      <ul>
        {Object.keys(decks).map((deckId) => (
          <li key={deckId}>
            <Link to={`/viewer/${deckId}`}>{decks[deckId].name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;