import React from 'react'
import FeaturedList from '../../components/FeaturedList/FeaturedList'
import StoryIcon from '../../components/StoryIcon/StoryIcon'
import { apiCall } from '../../services/apiService'

class HomePage extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
          displayedStories: [],
          projectImages: null,
          usernames: [],
     
        }
      }

      componentDidMount = async () => {
        await this.fetchUserData()
        await this.fetchStoryData()
      }

      fetchUserData = async () => {
        const userData = await apiCall.get('/users')
        const usernames = userData.data.map(element => element.username)
        this.setState(prevState => ({
          usernames: usernames
        }))
      }
    
      fetchStoryData = async () => {
        const stories = await apiCall.get('/story')
        const images = stories.data.map(project => {
          return project.imgUrl
        })
  
        this.setState({
          displayedStories: stories.data,
          projectImages: images,
        })
      }


        // Map through all the stories in the database and pass down needed data to the project icons
    createIcons = () => {
        const { displayedStories } = this.state

        if (displayedStories.length) {
        //if there are projects in the array...
        return displayedStories.map(project => {
            return (
            <StoryIcon
                key={project.id}
                title={project.name}
                image={project.imgUrl}
                link={`/project/${project.id}`}
                description={project.description}

            />
            )
        })
        }
    }

    render(){

        return(
            <div className="homepage-container">
              
                <FeaturedList />
             
            </div>
        )
    }
}

export default HomePage;