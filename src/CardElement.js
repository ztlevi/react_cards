import React, { Component } from 'react';

export default class CardElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let cardIndex = this.props.cardIndex;

    let rightButton =
      cardIndex !== 3 ? (
        <button onClick={() => this.props.moveToRight(this.props.cardIndex, this.props.text)}>
          >
        </button>
      ) : null;
    let leftButton =
      cardIndex !== 0 ? (
        <button onClick={() => this.props.moveToLeft(this.props.cardIndex, this.props.text)}>
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
