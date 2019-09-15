import React from 'react'
import './ReviewPost.css'
import { apiCall } from '../../services/apiService'

class ReviewPost extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            starFilled: false,
            totalStars: 0
        }
    }


    componentDidMount = () => {
        
        this.fetchStarNumber()
     

    }

    fetchStarNumber = async () =>{
        //TODO findAll in stars that have a reviewId of THIS review 
        let id = this.props.reviewID

        const totalStarCount = await apiCall.get(`review/${id}`);
     
        await this.setState({
            totalStars: totalStarCount.data.length
        })

    }


    handleStarClick = async () => {

        let id = this.props.reviewID
        console.log("STAR FOR REVIEW WTIH ID:" + id)
        const currentUserId = localStorage.getItem('userId')

        console.log('Current user ID:' + currentUserId)

        const currentStars = this.state.totalStars

        if(!this.state.starFilled){
            this.setState({
                starFilled: true,
                totalStars: currentStars + 1

            })
            await apiCall.post(`review/${id}`, {currentUserId})

        }else{
            const currentStars = this.state.totalStars
            this.setState({
                starFilled: false,
                totalStars: currentStars - 1

            })
            await apiCall.delete(`review/${id}/${currentUserId}`)

        }
    }

    render(){
        return(
            <div className='review-post-container'>
                <p>{this.props.text}</p>
                <div className='star-container'>
                    {!this.state.starFilled && (
                        <div onClick={this.handleStarClick} className='star-icon'></div>
                    )}
                    {this.state.starFilled && (
                        <div onClick={this.handleStarClick} className='star-icon-filled'></div>
                    )}
                    <p>{this.state.totalStars}</p>
                </div>
            </div>
        )
    }
}


export default ReviewPost;