import React from 'react';
import logo from './logo.svg';
import HomePage from './screens/HomePage/HomePage'
import { Route, Link, Redirect } from 'react-router-dom'

import './App.css';

class App extends React.Component {


  render(){
    return (
      <div className="App">
         ​
          <Route
            exact
            path="/"
            render={props => <HomePage {...props}/>}
          />
      </div>
    );
  }
}

export default App;
