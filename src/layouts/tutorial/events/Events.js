import React, { Component } from 'react';
import './Events.css';
import Card from '../../../components/card/card';

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
      collapsed: true
    };
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  startCreateEventHandler = () => {
    const cardContent = this.cardContainerEl.current.firstChild;

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
        this.props.fetchEvents();
      })
      .catch(err => {
        console.log(err);
      });
  };

  cardCancelHandler = () => {
    this.setState({ cardHeight: null, creating: false, collapsed: true });
  };

  render() {
    const eventList = this.props.eventList.map(event => {
      return (
        <li key={event._id} className="events__list-item">
          {event.title}
        </li>
      );
    });
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
        <ul className="events__list">{eventList}</ul>
      </React.Fragment>
    );
  }
}

export default Events;
