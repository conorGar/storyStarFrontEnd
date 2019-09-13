
import React from 'react'
import { apiCall } from '../../services/apiService'
import { Link } from 'react-router-dom'


import './Dashboard.css'


class Dashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          stories: []
        }
      }
      componentDidMount() {
        this.fetchUserInfo()
      }
    
      fetchUserInfo = async () => {
        const response = await apiCall.get(`/users/${localStorage.getItem('userId')}`)
        const {
          data: {
            user: { name, username, email, stories, imgUrl }
          }
        } = response
        this.setState({
          name,
          username,
          email,
          stories,
          imgUrl
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
              <div className='project-header'>
                {/* <Link to={`/story/update/${project.id}`}><button>Edit</button></Link> */}
                <h3>{project.name}</h3>
                <button onClick={() => this.deleteProject(project.id)}>Delete</button>
              </div>
              <Link to={`/story/${project.id}`}>
                <img
                  src={project.imgUrl}
                  alt="ProjPic"
                  className="profile-project-pic"
                />
              </Link>
            </div>
          )
        })
      }
    
        
    render(){
        const { name, username, email } = this.state

        return(
            <div>
                <h1>Dashboard</h1>
                    <Link
                    to={`/project/upload/user/${localStorage.getItem('userId')}`}
                    className="links"
                    >
                    <div>Upload Story</div>
                </Link>
                
                <div className="pro-proj-container">
                    <div className="prof-header">
                    <div className='profile-container'>
                        <div className='profile-left'>
                        <img className="profile-image" src={this.state.imgUrl} alt='profile-pic' />
                        </div>
                        <div className='profile-right'>
                        <h1 className="prof-name">{name}</h1>
                        <h2 className="prof-username">{username}</h2>
                        <h3 className="prof-email">{email}</h3>
                        <Link to={`/users/edit/${this.props.match.params.id}`}>Edit Profile</Link>
                        </div>
                    </div>

                    </div>
                    <div className="user-project-list">
                    {this.renderProjects()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;