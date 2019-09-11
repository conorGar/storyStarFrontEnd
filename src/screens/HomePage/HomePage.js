import React from 'react'

class HomePage extends React.Component(){
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

            </div>
        )
    }
}

export default HomePage;