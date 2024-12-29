import React from 'react';
import './CardEditor.css';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { front: '', back: '' };
  }
  // Functions
  addCard = () => {
    const{ front, back } = this.state;
    if (front.trim() === '' || back.trim() === '') {
        return;
      }
    else {
        this.props.addCard(this.state);
        this.setState({ front: '', back: '' });
    }
  };

  deleteCard = (index) => {
    this.props.deleteCard(index);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Rendering Orientation
  render() {
    const cards = this.props.cards.map((card, index) => (
      <tr key={index}>
        <td>{card.front}</td>
        <td>{card.back}</td>
        <td>
          <button onClick={() => this.deleteCard(index)}>Delete Card</button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h2>Card Editor</h2>
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </table>

        <br />

        <input
          name="front"
          onChange={this.handleChange}
          placeholder="Front of card"
          value={this.state.front}
        />
        <input
          name="back"
          onChange={this.handleChange}
          placeholder="Back of card"
          value={this.state.back}
        />
        <button onClick={this.addCard}>Add Card</button>
      </div>
    );
  }
}

export default CardEditor;