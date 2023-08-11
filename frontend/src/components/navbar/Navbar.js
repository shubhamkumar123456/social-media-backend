import React, { useContext } from 'react'
import './Navbar.css'
import {Chat, Notifications, Person, Search} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
    const {user}=useContext(AuthContext)
    const PF= process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className='navbarContainer'>
          <div className="navbarLeft">
            <Link to="/" style={{textDecoration:"none"}}><span className='logo'>Be Social</span></Link>
        </div>
        <div className="navbarCenter">
            <div className="searchbar">
            <Search className='searchIcon'/>
            <input type="text" placeholder='search for friend, post or videos' className='searchInput'/>
            </div>
        </div>
        <div className="navbarRight">
            <div className="navbarLinks">
                <span className='navbarLinks'>Homepage</span>
                <span className='navbarLinks'>TimeLine</span>
            </div>
            <div className="navbarIcons">
                <div className="navbarIconItem">
                    <Person/>
                    <span className="navbarBadge">1</span>
                </div>
                <div className="navbarIconItem">
                    <Chat/>
                    <span className="navbarBadge">2</span>
                </div>
                <div className="navbarIconItem">
                <Notifications/>
                    <span className="navbarBadge">1</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture?PF+user.profilePicture:PF+"persons/noAvatar.jpg"} alt="" className='navbarImg'/>
            </Link>
        </div>
    </div>
  )
}

export default Navbar
