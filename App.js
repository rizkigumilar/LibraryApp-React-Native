import React, { Component } from 'react'
import { Provider } from 'react-redux';
import store from './src/publics/redux/store';

import MainNavigator from './src/publics/navigators/MainNavigator'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}

export default App