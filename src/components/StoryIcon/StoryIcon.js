import React from 'react'
import './StoryIcon.css'
import { Link } from 'react-router-dom'

class StoryIcon extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Link to={this.props.link} className='links'>

            <div className="story-icon-container">
                <div className='story-icon-picture'><img className='story-image' src={this.props.image} /></div>
                <h5 className="story-name">{this.props.title}</h5>
                <h6 className="story-desc">{this.props.description}</h6>

                <div className="bottom-part"></div>
            </div>
            </Link>
        )
    }
}

export default StoryIcon;