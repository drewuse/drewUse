import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './Chat';

import { Router, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Chat/>
      </div>
    );
  }
}

export default App;
