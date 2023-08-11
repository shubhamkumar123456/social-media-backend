
import React, { useContext, useEffect, useState } from 'react'
import './Rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@mui/icons-material'


const Rightbar = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setfriends] = useState([]);
  const {user:currentUser,dispatch}=useContext(AuthContext)
  const [followed, setfollowed] = useState(currentUser.followings.includes(user?.id));

  useEffect(()=>{
   setfollowed(currentUser.followings.includes(user?.id))
  },[currentUser,user])

  // console.log(user.user._id)
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("http://localhost:5000/api/users/friends/"+user.user._id);
        setfriends(friendList.data);
      } catch (error) {
        console.log(error)
      }
    }
    getFriends();
  },[user])

  const followHandler=async()=>{
    try {
      if(followed){
        await axios.put("http:localhost:5000/api/users/"+user._id+"/unfollow",{userId:currentUser._id});
        dispatch({type:"UNFOLLOW",payload:user._id})
      }else{
        await axios.put("http:localhost:5000/api/users/"+user._id+"/follow",{userId:currentUser._id});
        dispatch({type:"FOLLOW",payload:user._id})
      }
    } catch (error) {
      // console.log(error)
    }
    setfollowed(!followed)
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">

          <img className='birthdayImg' src="assets/gift-box.png" alt="birthday" />
          <span className='birthdayText'>
            <b>The Undertaker</b> and <b>3 others </b> have a birthday today </span>
        </div>
        <img className='rightbarAd' src="assets/add.png" alt="" />
        <h4 className='rightbarTitle'>online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}

        </ul>
      </>
    )
  }
  const ProfileRightBar = () => {
    return (
      <>
      {user.username!==currentUser.username &&(
        <button className="rightbarFollowButton" onClick={followHandler}>
          {followed?"Unfollowed" : "Follow"}
          {followed?<Remove/> : <Add/>}
          
        </button>
      )}
        <h4 className='rightbrTitle'>User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoKey">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoKey">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoKey">{user.relationship === 0 ? "Single" : user.relationship === 1 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className='rightbrTitle'>User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
            <div className="rightbarFollowing">
              <img className='rightbarFollowingImg' src={friend.profilePicture ? PF + friend.profilePicture : PF +"persons/noAvatar.jpg"} alt="" />
              <span className='rightbarFollowingName'>{friend.username}</span>
            </div>
            </Link>
          ))}

        </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user?<ProfileRightBar/>:<HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
