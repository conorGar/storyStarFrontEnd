import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import FeaturedList from '../../components/FeaturedList/FeaturedList'

class HomePage extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
          displayedStories: [],
          projectImages: null,
          usernames: [],
        }
      }

    render(){
        return(
            <div className="homepage-container">
                <NavBar />
                <FeaturedList />
            </div>
        )
    }
}

export default HomePage;