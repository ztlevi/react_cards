import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.cardLen = 4;
    this.state = {
      cards: new Array(this.cardLen).fill([]),
    };
  }

  componentDidMount() {
    let cards = localStorage.getItem('cards');
    if (cards) {
      console.log(cards);
      cards = JSON.parse(cards);
      this.setState({ cards });
    }
  }

  moveToRight = (i, element) => {
    let cards = this.state.cards;
    if (i > this.cardLen - 1) return;
    let idx = cards[i].indexOf(element);
    if (idx > -1) {
      cards[i].splice(idx, 1);
      cards[i + 1].push(element);
    }
    this.updateCards(cards);
  };

  moveToLeft = (i, element) => {
    let cards = this.state.cards;
    console.log(cards);

    if (i < 1) return;
    let idx = cards[i].indexOf(element);
    if (idx > -1) {
      cards[i].splice(idx, 1);
      cards[i - 1].push(element);
    }
    this.updateCards(cards);
  };

  pushCard = i => {
    let cards = this.state.cards;
    this.setState({ cards });
    let text = window.prompt('Add a card');

    if (text) {
      cards[i].push(text);
      this.updateCards(cards);
    }
  };

  updateCards(cards) {
    this.setState({ cards });
    let str = JSON.stringify(cards);
    localStorage.setItem('cards', str);
  }

  render() {
    let cardsInfo = [
      {
        name: 'Winnie',
        color: '#8E6E95',
      },
      {
        name: 'Bob',
        color: '#39A59C',
      },
      {
        name: 'Thomas',
        color: '#344759',
      },
      {
        name: 'George',
        color: '#E8741E',
      },
    ];
    return (
      <div className="App">
        {cardsInfo.map((card, i) => {
          return (
            <Card
              name={card.name}
              color={card.color}
              cardIndex={i}
              cardNumber={this.cardLen}
              moveToLeft={this.moveToLeft}
              moveToRight={this.moveToRight}
              pushCard={this.pushCard}
              cardElements={this.state.cards[i]}
            />
          );
        })}
      </div>
    );
  }
}

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let name = this.props.name;
    let cardElements = this.props.cardElements.map((el, i) => {
      return (
        <CardElement
          text={el}
          cardIndex={this.props.cardIndex}
          moveToLeft={this.props.moveToLeft}
          moveToRight={this.props.moveToRight}
          {...this.props}
        />
      );
    });
    return (
      <div className="column">
        <div className="cardPadding">
          <div
            className="cardHeader"
            style={{ backgroundColor: this.props.color }}
          >
            {name}
          </div>
          {cardElements}
          <button onClick={() => this.props.pushCard(this.props.cardIndex)}>
            Add a card
          </button>
        </div>
      </div>
    );
  }
}

class CardElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let cardIndex = this.props.cardIndex;

    let rightButton =
      cardIndex !== 3 ? (
        <button
          onClick={() =>
            this.props.moveToRight(this.props.cardIndex, this.props.text)
          }
        >
          >
        </button>
      ) : null;
    let leftButton =
      cardIndex !== 0 ? (
        <button
          onClick={() =>
            this.props.moveToLeft(this.props.cardIndex, this.props.text)
          }
        >
          {'<'}
        </button>
      ) : null;

    return (
      <div className="cardElement">
        {leftButton}
        {this.props.text}
        {rightButton}
      </div>
    );
  }
}

export default App;
