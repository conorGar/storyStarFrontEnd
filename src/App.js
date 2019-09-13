import React from 'react';
import HomePage from './screens/HomePage/HomePage'
import Dashboard from './screens/Dashboard/Dashboard'
import { Route, Link, Redirect } from 'react-router-dom'
import SignUpForm from './screens/SignUpForm/SignUpForm'
import LoginForm from './screens/LoginForm/LoginForm'
import { login, signUp, getProfile } from './services/apiService'
import NavBar from './components/NavBar/NavBar'

import './App.css';

class App extends React.Component {

  constructor(props){
      super(props)
      this.state = {
        isSignedIn: false,
        showLoginForm: 'loginform-hide',
        showSignupForm: 'signup-hide'
      }
  }

  loginUser = async credentials => {
    try {
      const user = await login(credentials)
      this.setState(state => {
        return {
          isSignedIn: true,
          user: user
        }
      })
    } catch (error) {
      throw error
    }
  }

  signUpUser = async credentials => {
    try {
      await signUp(credentials)
      const newUser = await {
        username: credentials.username,
        password: credentials.password
      }
      this.loginUser(newUser)
    } catch (error) {
      throw error
    }
  }


  updateLoginPopup = () => {
    if (this.state.showLoginForm === 'loginform-hide') {
      this.setState({
        showLoginForm: 'loginform-show'
      })
    } else {
      this.setState({
        showLoginForm: 'loginform-hide'
      })
    }
  }

  updateSignupPopup = () => {
    console.log('Got to update signup popup')
    if (this.state.showSignupForm === 'signup-hide') {
      this.setState({
        showSignupForm: 'signup-show',
        showLoginForm: 'loginform-hide'
      })
    } else {
      this.setState({
        showSignupForm: 'signup-hide'
      })
    }
  }


  render(){
    const { isSignedIn} = this.state

    return (
      <div className="App">
         ​  <NavBar   
                    signOutUser={this.signOutUser}
                    isSignedIn={isSignedIn}
                    updatePopupStatus={this.updateLoginPopup}
          />


          <Route
            exact
            path="/"
            render={props => <HomePage {...props}/>}
          />

          <Route
            exact
            path="/dashboard/:id"
            render={props => <Dashboard {...props}/>}
          />


             <LoginForm
                handleLogin={this.loginUser}
                currentClass={this.state.showLoginForm}
                toggleLoginPopup={this.updateLoginPopup}
                toggleSignupPopup={this.updateSignupPopup}
                isSignedIn={isSignedIn}
                />
                <SignUpForm
                    handleSignUp={this.signUpUser}
                    currentClass={this.state.showSignupForm}
                    toggleSignupPopup={this.updateSignupPopup}
                    isSignedIn={isSignedIn}
                    handleSignUp={this.signUpUser}
                />  
      </div>
    );
  }
}

export default App;
