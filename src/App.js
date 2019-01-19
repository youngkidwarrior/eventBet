import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from './layouts/home/HomeContainer';
import TutorialContainer from './layouts/tutorial/TutorialContainer';
import MainNavigation from './components/navigation/MainNavigation'

// Styles
import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path='/tutorial' component={TutorialContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
