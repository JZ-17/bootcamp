import React from 'react';
import './CardViewer.css';
import { Link } from 'react-router-dom';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0, 
      showFront: true,
    };
  }

  handleFlip = () => {
    this.setState((prevState) => ({ showFront: !prevState.showFront }));
  };

  handleNext = () => {
    if (this.state.currentIndex < this.props.cards.length - 1) {
      this.setState({ currentIndex: this.state.currentIndex + 1, showFront: true });
    }
  };

  handlePrevious = () => {
    if (this.state.currentIndex > 0) {
      this.setState({ currentIndex: this.state.currentIndex - 1, showFront: true });
    }
  };

  render() {
    const { currentIndex, showFront } = this.state;
    const { cards } = this.props;

    // Handle empty card list
    if (cards.length === 0) {
      return (
        <div>
          <h2>Card Viewer</h2>
          <p>No cards to display. Please add some cards in the editor.</p>
          <Link to="/editor">
            <button>Go to Card Editor</button>
          </Link>
        </div>
      );
    }

    const currentCard = cards[currentIndex];

    return (
      <div>
        <h2>Card Viewer</h2>
        {/* Flash Card */}
        <div className="flashcard" onClick={this.handleFlip}>
          {showFront ? currentCard.front : currentCard.back}
        </div>

        {/* Progress bar */}
        <div>
          <p>
            Card {currentIndex + 1}/{cards.length}
          </p>
        </div>

        {/* Navigation buttons */}
        <div>
          <button
            onClick={this.handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={this.handleNext}
            disabled={currentIndex === cards.length - 1}
          >
            Next
          </button>
        </div>

        <div>
          <Link to="/editor">
            <button>Go to Card Editor</button>
          </Link>
          <Link to="/">
            <button>Go to Home Page</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CardViewer;

