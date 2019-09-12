import React from 'react'
import { Link } from 'react-router-dom'


import './NavBar.css'

class NavBar extends React.Component{

    handleLoginClick = e => {
        e.preventDefault()
        console.log(this.props)
        this.props.updatePopupStatus()
      }

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
                    <div>
                    {!this.props.isSignedIn && (
                        <Link to="/user/login" className="links">
                        <div
                            onClick={this.handleLoginClick}
                        >
                            Login
                        </div>
                        </Link>
                    )}

                    {this.props.isSignedIn && (
                        <Link
                        to={`/project/upload/user/${localStorage.getItem('userId')}`}
                        className="links"
                        >
                        <div
                        >
                            New Story
                        </div></Link>
                    )}

                    {this.props.isSignedIn && (
                        <Link
                        to={`/dashboard/${localStorage.getItem('userId')}`}
                        className="links"
                        >
                        <div
                        >
                            Dashboard
                        </div>
                        </Link>
                    )}


                    {this.props.isSignedIn && (
                        <Link
                        to={'/'}
                        className="links"
                        >
                        <div
                            onClick={this.props.signOutUser}
                        >
                            Sign Out
                        </div></Link>
                    )}
                    </div>
                </div>

            </div>
        )
    }
}


export default NavBar