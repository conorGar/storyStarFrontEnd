import React from 'react'
import { Link } from 'react-router-dom'


import './NavBar.css'

class NavBar extends React.Component{
    render(){
        return(
            <div className='navbar-container'>
                <div className = 'left-navbar-container'>
                    <Link to='/latest'>
                    <div>Latest</div>
                    </Link>
                    <div>Random</div>
                    <div>About</div>
                </div>
                <div className="right-navbar-container">
                    <div>Publish</div>
                </div>

            </div>
        )
    }
}


export default NavBar