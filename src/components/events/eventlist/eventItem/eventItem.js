import React from 'react';
import Card from '../../../card/card';
import './eventItem.css';

const eventItem = props => (
  <li key={props.eventId} className="event__list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>
        ${props.price} - {new Date(props.date).toLocaleDateString()}
      </h2>
    </div>
    <div>
      {props.userId === props.creatorId && (
        <p>You're the owner of this event</p>
      )}
      {props.userId === props.creatorId || props.selectedEvent ? null : (
        <button
          className="btn"
          onClick={props.onDetail.bind(this, props.eventId)}
        >
          View details
        </button>
      )}
    </div>

    {props.selectedEvent && (
      <div
        ref={props.eventId === props.selectedEvent._id ? props.setRef : null}
      >
        {props.eventId === props.selectedEvent._id ? (
          <Card
            title={props.selectedEvent.title}
            canCancel
            canConfirm
            onCancel={props.cancel}
            onConfirm={props.confirm}
            scrollHeight={props.selectedCardHeight}
            collapsed={props.selectedCollapsed}
            confirmText="Book"
          >
            <h1>{props.selectedEvent.title}</h1>
            <h1>
              {' '}
              ${props.selectedEvent.price} -{' '}
              {new Date(props.selectedEvent.date).toLocaleDateString()}
            </h1>
            <p>{props.selectedEvent.description}</p>
          </Card>
        ) : null}
      </div>
    )}
  </li>
);

export default eventItem;
