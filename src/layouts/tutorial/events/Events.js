import React, { Component } from 'react';

import './Events.css';
import Card from '../../../components/card/card';
import Spinner from '../../../components/spinner/spinner';
import EventList from '../../../components/events/eventlist/eventList';

class Events extends Component {
  constructor(props) {
    super(props);
    this.cardContainerEl = React.createRef();
    this.titleEl = React.createRef();
    this.priceEl = React.createRef();
    this.dateEl = React.createRef();
    this.descriptionEl = React.createRef();
    this.state = {
      cardHeight: null,
      creating: false,
      collapsed: true,
      selectedEvent: null
    };
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  startCreateEventHandler = () => {
    const cardContent = this.cardContainerEl.firstChild;
    this.setState({
      cardHeight: cardContent.scrollHeight + 'px',
      creating: true,
      collapsed: false
    });
  };

  cardConfirmHandler = () => {
    this.setState({ cardHeight: null, creating: false, collapsed: true });
    const title = this.titleEl.current.value;
    const price = +this.priceEl.current.value;
    const date = this.dateEl.current.value;
    const description = this.descriptionEl.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }
    const event = { title, price, date, description };
    console.log(event);
    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {title:"${title}", price:${price}, date: "${date}", description:"${description}"}){
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
    };
    const token = this.props.token;
    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const event = {
          _id: this.props.userId,
          title: resData.data.createEvent.title,
          description: resData.data.createEvent.description,
          date: resData.data.createEvent.date,
          price: resData.data.createEvent.price,
          creator: { _id: this.props.userId }
        };
        this.props.addEvent(event);
      })
      .catch(err => {
        console.log(err);
      });
  };

  cardCancelHandler = () => {
    this.setState({
      cardHeight: null,
      creating: false,
      collapsed: true,
      selectedEvent: null
    });
  };

  bookEventHandler = () => {};

  showDetailHandler = eventId => {
    const selectedEvent = this.props.eventList.find(e => e._id === eventId);

    this.setState({ selectedEvent: selectedEvent }, () => {
      this.setState(prevState => {
        const cardContent = this.eventListEl.firstChild;
        return {
          cardHeight: cardContent.scrollHeight + 'px',
          collapsed: false
        };
      });
    });
  };

  setCardRef = ref => {
    this.eventListEl = ref;
  };

  render() {
    return (
      <React.Fragment>
        {this.props.token && (
          <div className="events-control">
            <p> Share your own Events!</p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Event
            </button>
            <div ref={this.cardContainerEl}>
              <Card
                title="Add Event"
                canCancel
                canConfirm
                onCancel={this.cardCancelHandler}
                onConfirm={this.cardConfirmHandler}
                scrollHeight={this.state.cardHeight}
                collapsed={this.state.collapsed}
                confirmText='Confirm'
              >
                <form>
                  <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" ref={this.titleEl} />
                  </div>
                  <div className="form-control">
                    <label htmlFor="price">Price</label>
                    <input type="price" id="price" ref={this.priceEl} />
                  </div>
                  <div className="form-control">
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" ref={this.dateEl} />
                  </div>
                  <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="description"
                      id="description"
                      ref={this.descriptionEl}
                    />
                  </div>
                </form>
              </Card>
            </div>
          </div>
        )}
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <EventList
            events={this.props.eventList}
            authUserId={this.props.userId}
            onViewDetail={this.showDetailHandler}
            cardCancelHandler={this.cardCancelHandler}
            bookEventHandler={this.bookEventHandler}
            setCardRef={this.setCardRef}
            selectedCardHeight={this.state.cardHeight}
            selectedCollapsed={this.state.collapsed}
            selectedEvent={this.state.selectedEvent}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Events;
