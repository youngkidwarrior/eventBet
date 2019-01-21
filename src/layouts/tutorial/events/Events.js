import React, { Component } from 'react';
import './Events.css';
import Card from '../../../components/card/card';
import Backdrop from '../../../components/backdrop/backdrop';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: false
    };
  }

  startCreateEventHandler = () => {
    this.setState({
      creating: true
    });
  };

  cardConfirmHandler = () => {
    this.setState({ creating: false });
  };

  cardCancelHandler = () => {
    this.setState({ creating: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Card
            className="card-event"
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.cardCancelHandler}
            onConfirm={this.cardConfirmHandler}
          >
            <p> Card Content</p>
          </Card>
        )}
        <div className="events-control">
          <p> Share your own Events!</p>
          <button className="btn" onClick={this.startCreateEventHandler}>
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Events;
