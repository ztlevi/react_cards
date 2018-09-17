import React, { Component } from 'react';

import CardElement from './CardElement';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let name = this.props.name;
    let cardElements = this.props.cardElements.map((el, i) => {
      return (
        <CardElement
          text={el}
          key={i}
          cardIndex={this.props.cardIndex}
          moveToLeft={this.props.moveToLeft}
          moveToRight={this.props.moveToRight}
          {...this.props}
        />
      );
    });
    return (
      <div className="cardColumn">
        <div className="cardHeader" style={{ backgroundColor: this.props.color }}>
          {name}
        </div>
        {cardElements}
        <button onClick={() => this.props.pushCard(this.props.cardIndex)}>Add a card</button>
      </div>
    );
  }
}
