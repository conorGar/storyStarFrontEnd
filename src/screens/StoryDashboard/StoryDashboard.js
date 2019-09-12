
import React from 'react'
import './StoryDashboard.css'


class StoryDashboard extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            type: '',
            name: 'Test Story Title',
            description: '',
            imgUrl: '',
            username: ''

        }
    }


    render(){
        return(
            <div>
                <h1>{this.state.name}</h1>
                <div>Upload New Chapter</div>

                {/* put given chapters here */}

            </div>
        )
    }
}

export default StoryDashboard;