
import React from 'react'
import { apiCall } from '../../services/apiService'
import { Link } from 'react-router-dom'


import './Dashboard.css'
import { async } from 'q';


class Dashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          stories: [],
          starRank: 'D',
          star_points:0,
          subscriptions: [],
          subscribedStories: []
        }
      }
      componentDidMount() {
        this.fetchUserInfo()
        
      }
    
      fetchUserInfo = async () => {
        const response = await apiCall.get(`/users/${localStorage.getItem('userId')}`)
        const {
          data: {
            user: { name, username, email, stories, imgUrl, star_points, subscriptions }
          }
        } = response
        this.setState({
          name,
          username,
          email,
          stories,
          imgUrl,
          star_points,
          subscriptions
        })

        this.determineStarRank()
        this.fetchSubscriptionInfo()
      }

      fetchSubscriptionInfo = async () => {
        await this.state.subscriptions.forEach(async(subscription) => {
          const id = subscription.storyId
          const data =await apiCall.get(`story/subscribed/${id}`)
          await this.setState(prevState => ({
            subscribedStories: [...prevState.subscribedStories, data]
          }))
          // await apiCall.get(`story/subscribed/${id}`)
        })
       
        // await this.setState({
        //   subscribedStories
        // })
      }

      determineStarRank = () =>{
        const {star_points} = this.state;
        let rank = 'D';
        if(star_points >= 5 && star_points < 10){
          rank = 'C'
        }else if(star_points >= 10 && star_points < 20){
          rank = 'B'
        }else if(star_points >= 20 && star_points < 30){
          rank = 'A'
        }else if(star_points >= 30 && star_points < 55){
          rank='A+'
        }else if(star_points >= 45){
          rank = 'S'
        }

        this.setState({
          starRank: rank
        })

      }

      deleteProject = async (id) => {
        await apiCall.delete(`story/${id}`)
        await this.fetchUserInfo()
      }
    
      renderProjects = () => {
        const { stories } = this.state
        return stories.map(project => {
          return (
            <div key={project.id} className="user-project">
              
              <Link to={`/story/${project.id}`} className='links'>
                <img
                  src={project.imgUrl}
                  alt="ProjPic"
                  className="profile-project-pic"
                />
                <h3 className='story-name'>{project.name}</h3>
                <h5 className='story-des'>{project.description}</h5>
                <div className='project-header'>
                
              </div>

              </Link>
              <div className='button-container'>
                  <Link to={`/story/update/${project.id}`}><button className='button'>Edit</button></Link>
                  <button onClick={() => this.deleteProject(project.id)} className='button'>Delete</button>
                </div>
            </div>
          )
        })
      }

      renderSubscriptions = () => {
        const { subscribedStories } = this.state
        console.log(subscribedStories)
        console.log(subscribedStories.length)

        return subscribedStories.map(project => {
          console.log("GOT HERE- SUBSCRIPTION DISPLAY")
          console.log(project)
          return (
            <div key={project.id} className="user-project">
              
              <Link to={`/story/${project.id}`} className='links'>
                <img
                  src={project.data.imgUrl}
                  alt="ProjPic"
                  className="profile-project-pic"
                />
                <h3 className='story-name'>{project.data.name}</h3>
                <h5 className='story-des'>{project.data.description}</h5>
                <div className='project-header'>
                
              </div>

              </Link>
              
            </div>
          )
        })
      }
    
        
    render(){
        const { name, username, email } = this.state

        return(
            <div>
                <div className='dashboard-banner'>
                  <h1></h1>
                </div>
                  
                
                <div className="pro-proj-container">
                    <div className="prof-header">
                    <div className='profile-container'>

                        <div className='profile-left'>
                          <img className="profile-image" src={this.state.imgUrl} alt='profile-pic' />
                        </div>

                        <div className='profile-right'>
                          <div className='name-container'>
                            <h2 className="prof-name">{name}</h2>
                            <h2 className="prof-username">{username}</h2>
                            {/* <h3 className="prof-email">{email}</h3> */}
                            <Link to={`/users/edit/${this.props.match.params.id}`}>Edit Profile</Link>
                          </div>
                          <div className="vl"></div>
                          <div className='star-rank-container'>
                            <h2 className='star-rank-title'>Reviewer Rank:</h2>
                            <h1 className='star-rank'>{this.state.starRank}</h1>
                            <div className='star-count-container'>
                              <div className='star-icon'></div>
                              <h4 className='star-count'>{this.state.star_points}</h4>
                            </div>
                          </div>
                        </div>
                    </div>
                   
                    </div>
                    <div className="user-project-list">
                    <Link
                    to={`/story/upload/user/${localStorage.getItem('userId')}`}
                    className="links"
                    >
                      <div className='new-story-button'>+ New Story</div>
                    </Link>
                    <h1 className='story-section-title'>Stories</h1>
                    <div className='story-list'>
                      {this.renderProjects()}
                    </div>
                    <h1 className='story-section-title'>Subscriptions</h1>
                    <div className='story-list'>
                      {this.renderSubscriptions()}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;