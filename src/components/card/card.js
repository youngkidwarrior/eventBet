import React from 'react';
import './card.css';

const Card = props => (
  <div
    className={'card' + (props.collapsed ? ' collapsed' : '')}
    style={{maxHeight:props.scrollHeight}}
  >
    <header className="card__header">{props.title}</header>
    <section className="card__content">{props.children}</section>
    <section className="card_actions">
      {props.canCancel && (
        <button className="btn" onClick={props.onCancel}>
          Cancel
        </button>
      )}
      {props.canConfirm && (
        <button className="btn" onClick={props.onConfirm}>
          Confirm
        </button>
      )}
    </section>
  </div>
);

export default Card;
