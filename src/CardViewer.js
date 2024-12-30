import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from './index';
import './CardViewer.css';

const CardViewer = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayFront, setDisplayFront] = useState(true);

  useEffect(() => {
    const fetchDeck = async () => {
      const deckRef = ref(database, `/flashcards/${deckId}`);
      const snapshot = await get(deckRef);
      if (snapshot.exists()) {
        setDeck(snapshot.val());
      }
    };

    fetchDeck();
  }, [deckId]);

  if (!deck) {
    return <div>Loading...</div>;
  }

  const cards = deck.cards || [];
  const card = cards[currentIndex];

  return (
    <div>
      <h2>{deck.name}</h2>
      {cards.length > 0 ? (
        <div>
          <div
            className="flashcard"
            onClick={() => setDisplayFront(!displayFront)}
          >
            {displayFront ? card.front : card.back}
          </div>
          <br />
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1))
            }
            disabled={currentIndex === cards.length - 1}
          >
            Next
          </button>
        </div>
      ) : (
        <p>No cards available in this deck.</p>
      )}
      <br />
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default CardViewer;
