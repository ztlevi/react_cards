import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card';

class App extends Component {
  constructor(props) {
    super(props);
    this.cardLen = 4;
    let cards = new Array();
    for (let i = 0; i < this.cardLen; i++) {
      cards.push([]);
    }
    this.state = {
      cards,
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
              key={i}
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

export default App;
