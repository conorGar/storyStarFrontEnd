import React, { Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { apiCall } from '../../services/apiService'

import './LoginForm.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showError: false
    }
  }

  handleSubmitForm = async evt => {
    evt.preventDefault()
    const { username, password } = this.state
    const { handleLogin } = this.props
    try {
      await handleLogin({ username, password })
      // await this.props.history.push(`/dashboard/${localStorage.getItem('userId')}`)
      this.props.toggleLoginPopup()
    } catch (error) {
      this.setState(() => {
        return { showError: true }
      })
      throw error
    }
  }

  handleTextInput = async evt => {
    const { name, value } = evt.target

    this.setState({
      [name]: value
    })
  }

  render() {
    const { showError } = this.state

    let errMessage

    if (showError) {
      errMessage = (
        <div>
          <span>Incorrect Username or Password</span>
        </div>
      )
    }
    if (this.props.isSignedIn) {return <Redirect to={`/dashboard/${localStorage.getItem('userId')}`} />}


    return (
      <Fragment>
        {/* Hey! Not too familiar with Fragments.... is having a div redundant? a container called 'loginform-hide' is necessary for login popup to show properly */}
        <div className={this.props.currentClass}>
          {' '}
          {/*  class changed to determine whether the login popup displays or not...*/}
          <h2 className='login-title'>Login</h2>
          {errMessage}
          <form className="form" onSubmit={this.handleSubmitForm}>
            <div className='login-input-container'>
              <label htmlFor="username">Username:  </label>
              <input
                className='login-input'
                type="text"
                name="username"
                onChange={this.handleTextInput}
                defaultValue={this.state.username}
              />
            </div>
            <div className='login-input-container'>
              <label htmlFor="password">Password:  </label>
              <input
                className= 'login-input'
                type="password"
                name="password"
                onChange={this.handleTextInput}
                defaultValue={this.state.password}
              />
            </div>
            <button className="login-button">Login</button>
          </form>
          <div className="signup-button" onClick={this.props.toggleSignupPopup}>
            Create New Account
          </div>
          {/* <Link to="/user/signup">create new account</Link> */}
          <div className="close-button" onClick={this.props.toggleLoginPopup}>
            X
          </div>
        </div>
      </Fragment>
    )
  }
}

export default LoginForm
