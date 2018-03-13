import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.columnNumber = 4;
    this.state = {
      cards: [[], [], [], []],
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

  changeToRight = (i, element) => {
    let cards = this.state.cards;
    if (i > this.columnNumber - 1) return;
    let idx = cards[i].indexOf(element);
    if (idx > -1) {
      cards[i].splice(idx, 1);
      cards[i + 1].push(element);
    }
    this.updateCards(cards);
  };

  changeToLeft = (i, element) => {
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
    return (
      <div className="App">
        <Card
          name="Winnie"
          color="#8E6E95"
          cardIndex={0}
          changeToLeft={this.changeToLeft}
          changeToRight={this.changeToRight}
          pushCard={this.pushCard}
          cardElements={this.state.cards[0]}
        />
        <Card
          name="Bob"
          color="#39A59C"
          cardIndex={1}
          changeToLeft={this.changeToLeft}
          pushCard={this.pushCard}
          changeToRight={this.changeToRight}
          cardElements={this.state.cards[1]}
        />
        <Card
          name="Thomas"
          color="#344759"
          cardIndex={2}
          changeToLeft={this.changeToLeft}
          changeToRight={this.changeToRight}
          pushCard={this.pushCard}
          cardElements={this.state.cards[2]}
        />
        <Card
          name="George"
          color="#E8741E"
          cardIndex={3}
          changeToLeft={this.changeToLeft}
          changeToRight={this.changeToRight}
          pushCard={this.pushCard}
          cardElements={this.state.cards[3]}
        />
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
          changeToLeft={this.props.changeToLeft}
          changeToRight={this.props.changeToRight}
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
            this.props.changeToRight(this.props.cardIndex, this.props.text)
          }
        >
          >
        </button>
      ) : null;
    let leftButton =
      cardIndex !== 0 ? (
        <button
          onClick={() =>
            this.props.changeToLeft(this.props.cardIndex, this.props.text)
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
