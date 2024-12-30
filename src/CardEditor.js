import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ref, push, update } from 'firebase/database';
import { database } from './index';
import './CardEditor.css';

const CardEditor = () => {
  const [cards, setCards] = useState([]);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const addCard = () => {
    if (!front.trim() || !back.trim()) {
      alert('Cannot add empty card');
      return;
    }
    setCards([...cards, { front: front.trim(), back: back.trim() }]);
    setFront('');
    setBack('');
  };

  const deleteCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const createDeck = () => {
    const flashcardsRef = ref(database, '/flashcards');
    const newDeckRef = push(flashcardsRef);
    const deckId = newDeckRef.key;

    const newDeck = { cards, name };
    const updates = {};
    updates[`/flashcards/${deckId}`] = newDeck;
    updates[`/homepage/${deckId}`] = { name };

    update(ref(database), updates)
      .then(() => navigate(`/viewer/${deckId}`))
      .catch((error) => console.error('Error creating deck:', error));
  };

  return (
    <div>
      <h2>Card Editor</h2>
      <div>
        Deck Name:{' '}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter deck name"
        />
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Front</th>
            <th>Back</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={index}>
              <td>{card.front}</td>
              <td>{card.back}</td>
              <td>
                <button onClick={() => deleteCard(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <input
        value={front}
        onChange={(e) => setFront(e.target.value)}
        placeholder="Front of card"
      />
      <input
        value={back}
        onChange={(e) => setBack(e.target.value)}
        placeholder="Back of card"
      />
      <button onClick={addCard}>Add Card</button>
      <br />
      <button onClick={createDeck} disabled={!name.trim() || cards.length === 0}>
        Create Deck
      </button>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
};

export default CardEditor;
