import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import './SignUpForm.css'
import { apiCall } from '../../services/apiService'
import S3FileUpload from 'react-s3';
import { AwsConfig } from '../../services/AwsConfig'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showError: false,
      imgUrl: ''
    }
  }

  handleSubmitForm = async evt => {
    evt.preventDefault()

    const { name, username, password, email, linkedin, imgUrl } = this.state
    const { handleSignUp } = this.props

    try {
      await handleSignUp({ name, username, password, email, linkedin, imgUrl })
      // await this.props.history.push('/')
      this.props.toggleSignupPopup()

    } catch (error) {
      this.setState(() => {
        return { showError: true }
      })
      throw error
    }
  }

  handleImageUpload = async (evt) => {
    await S3FileUpload.uploadFile(evt.target.files[0], AwsConfig)
        .then((data) => {
            this.setState({
                imgUrl: data.location
            })
            console.log("Upload success at:" + data.location);
        }).catch((err) => {
            // alert(err);
        })
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
          <span>couldn't register account try new username</span>
        </div>
      )
    }

    if (this.props.isSignedIn) {return <Redirect to={`/dashboard/${localStorage.getItem('userId')}`} />}

    return (
     
      <Fragment>
        <div className={this.props.currentClass}>
          <div className="signup-left-side">
          <h2 className="copy-text">Become The Writer You Want To Be.</h2>
          </div>
          <div className="signup-right-side" >
            <h2>Signup</h2>
            {errMessage}
            <form className="signup-form" onSubmit={this.handleSubmitForm}>
              <div>
              <label htmlFor="uploadedImage" className='signup-label'>Profile Image</label>

                <input
                    name="uploadedImage"
                    type="file"
                    onChange={this.handleImageUpload}
                    className='signup-input'
                />
              </div>
              <div>
                <label htmlFor="name" className='signup-label'>Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  onChange={this.handleTextInput}
                  value={this.state.name}
                  placeholder="Full Name"
                  className='signup-input'

                />
              </div>
              <div>
                <label htmlFor="username" className='signup-label'>Username</label>
                <input
                  required
                  type="text"
                  name="username"
                  onChange={this.handleTextInput}
                  value={this.state.username}
                  placeholder="Username"
                  className='signup-input'

                />
              </div>
              <div>
                <label htmlFor="password" className='signup-label'>Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  onChange={this.handleTextInput}
                  value={this.state.password}
                  placeholder="Password"
                  className='signup-input'

                />
              </div>
              <div>
                <label htmlFor="email" className='signup-label'>Email</label>
                <input
                  required
                  type="text"
                  name="email"
                  onChange={this.handleTextInput}
                  value={this.state.email}
                  className='signup-input'

                />
              </div>
             
              <button className='signup-button-2'>Sign Up</button>
            </form>
            <div className="close-button2" onClick={this.props.toggleSignupPopup}>X</div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default SignUpForm
