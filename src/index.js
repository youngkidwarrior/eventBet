import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom'
import { DrizzleProvider } from 'drizzle-react'

// Layouts
import App from './App'
import { LoadingContainer } from 'drizzle-react-components'
import HomeContainer from './layouts/home/HomeContainer';
import TutorialContainer from './layouts/tutorial/TutorialContainer';

import { history, store } from './store'
import drizzleOptions from './drizzleOptions'

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history} store={store}>
          <App/>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
