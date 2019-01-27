import React from 'react';
import './eventList.css';
import EventItem from './eventItem/eventItem';

const eventList = props => {
  const events = props.events.map(event => {
    return (
      <EventItem
        eventId={event._id}
        title={event.title}
        price={event.price}
        date={event.date}
        userId={props.authUserId}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
        cancel={props.cardCancelHandler}
        confirm={props.bookEventHandler}
        setRef={props.setCardRef}
        scrollHeight={props.selectedCardHeight}
        collapsed={props.selectedCollapsed}
        selectedEvent={props.selectedEvent}
      />
    );
  });
  return <ul className="event__list">{events}</ul>;
};

export default eventList;
