import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import './PostReview.css'
import { apiCall } from '../../services/apiService'
import { AwsConfig } from '../../services/AwsConfig'


class PostReview extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          showError: false,
          reviewText: ''
        }
      }

      handleTextInput = async (evt) => {
        const { name, value } = evt.target
        this.setState({
            [name]: value
        })
      }

      handleSubmitForm = async evt => {
        evt.preventDefault()
        const id = this.props.idParam

        console.log("post review id:" + id)
        const { reviewText } = this.state
        const currentUserId = localStorage.getItem('userId')

        try {
          await apiCall.post(`/chapter/create/${id}/review`, {reviewText,currentUserId})

          this.props.buttonHandle()

        } catch (error) {
          this.setState(() => {
            return { showError: true }
          })
          throw error
        }
      }

      render(){
          return(
              <div className={this.props.currentClass}>

                <form className="review-submit-form" onSubmit={this.handleSubmitForm}>
                  <div className='text-area'>
                    <h3>Review:</h3>
                    <textarea
                        type='text'
                        name='reviewText'
                        className='description-input'
                        onChange={this.handleTextInput}
                        value={this.state.reviewText}
                    />
                    </div>
                    <button className="submit-review-button">Post</button>

                </form>
              </div>
          )
      }
}

export default PostReview;