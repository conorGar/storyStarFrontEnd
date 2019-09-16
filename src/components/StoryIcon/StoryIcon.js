import React from 'react'
import './StoryIcon.css'

class StoryIcon extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="story-icon-container">
                <div className='story-icon-picture'><img className='story-image' src={this.props.image} /></div>
                <h5 className="story-name">{this.props.title}</h5>
                <div className="bottom-part"></div>
            </div>
        )
    }
}

export default StoryIcon;