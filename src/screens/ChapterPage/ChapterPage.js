import React from 'react'
import './ChapterPage.css'
import { apiCall } from '../../services/apiService'
import { Link } from 'react-router-dom'
import PostReview from '../PostReview/PostReview'
import ReviewPost from '../../components/ReviewPost/ReviewPost'
import { async } from 'q';

import './ChapterPage.css'

class ChapterPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contents: [],
            postReviewClass: 'review-post-hide',
            reviews: []
        };
    }


    componentDidMount = () => {
        
        this.fetchChapterPages()
        this.fetchChapterReviews()

    }

     
    fetchChapterPages = async () => {
        let id = this.props.match.params.id
        const response = await apiCall.get(`chapter/story/${id}`)
      
        this.setState({
          name: response.data.name,
          contents: response.data.contents
        })
      }

      fetchChapterReviews = async () => {
        //TODO: this might have to be 'chapterID' not just id(might just be grabbing story id right now)
        let id = this.props.match.params.id
        const response = await apiCall.get(`chapter/review/${id}`)
        console.log(response)
        this.setState({
          reviews: response.data
        })

      }



    renderPages = () => {
        const { contents } = this.state
        return contents.map(content => {
          return (
            <div key={content.id} className="content-page">
                <img alt="content page" src={content.content_link} />
            </div>
          )
        })
      }

      renderReviews = () => {
        const { reviews } = this.state

        return reviews.map(review => {
          return (
            <ReviewPost key={review.id} reviewID ={review.id} text={review.description} />
          )
        })
      }

      handleReviewButton = (e) => {
          if(this.state.postReviewClass === 'review-post-form'){
            this.setState({postReviewClass:'review-post-hide'})
            this.fetchChapterReviews()

          }else{
            this.setState({postReviewClass:'review-post-form'})
          }
      }



    render(){
        return(
            <div className='chapter-page-contianer'>
                {this.renderPages()}
                <button className='review-post-button' onClick={this.handleReviewButton}>Post Review</button>
                <h2>Reviews</h2>
                {this.renderReviews()}
                <ReviewPost text="This is the test review" />
                <PostReview idParam ={this.props.match.params.id} currentClass={this.state.postReviewClass} buttonHandle={this.handleReviewButton}/>
            </div>
        )
    }
}

export default ChapterPage;