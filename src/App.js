import React from 'react';
import './App.css';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component {
  /* Cards */
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
      ],
      editor: true,
    };
  }

  /* Add and Delete Card Functions for Card Editor */
  addCard = (card) => {
    // Use spread operator to add new card
    const cards = [...this.state.cards, card];
    this.setState({ cards });
  };

  deleteCard = (index) => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  /* Toggle between Editor and Viewer */
  toggleMode = () => {
    if (this.state.cards.length === 0) {
      return;
    }
    else {
      this.setState((prevState) => ({
        editor: !prevState.editor,
      }));
    }
  };

  /* Rendering Clause */
  render() {
    if (this.state.editor) {
      return (
        <div>
          <button onClick={this.toggleMode}>Switch to Viewer</button>
          <CardEditor
            addCard={this.addCard}
            deleteCard={this.deleteCard}
            cards={this.state.cards}
          />
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleMode} disabled={this.state.cards.length === 0}>
            Switch to Editor
          </button>
          <CardViewer cards={this.state.cards} />
        </div>
      );
    }
  }
}

export default App;