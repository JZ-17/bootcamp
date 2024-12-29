import React from 'react';
import './CardViewer.css';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0, 
      showFront: true,
    };
  }
  // Functions
  handleFlip = () => {
    this.setState((prevState) => ({ showFront: !prevState.showFront }));
  };

  handleNext = () => {
    if (this.state.currentIndex < this.props.cards.length - 1) {
      this.setState({ currentIndex: this.state.currentIndex + 1, showFront: true });
    }
  };

  handlePrevious = () => {
    // Go to the previous card
    if (this.state.currentIndex > 0) {
      this.setState({ currentIndex: this.state.currentIndex - 1, showFront: true });
    }
  };

  render() {
    const { currentIndex, showFront } = this.state;
    const { cards } = this.props;
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
        
      </div>
    );
  }
}

export default CardViewer;
