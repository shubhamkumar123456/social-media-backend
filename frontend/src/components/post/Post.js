import React, { useContext } from 'react'
import './Post.css'
import {Favorite, MoreVert, ThumbUp } from '@mui/icons-material'

import { useState,useEffect } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


const Post = ({post}) => {
const [like, setlike] = useState(post.likes.length);
const [isLiked, setisLiked] = useState(false);
const [user, setuser] = useState({});
const PF= process.env.REACT_APP_PUBLIC_FOLDER;
const {user:currentUser}= useContext(AuthContext)

useEffect(()=>{
  setisLiked(post.likes.includes(currentUser._id));
},[currentUser._id,post.likes])

useEffect(() =>{
  const fetchUser=async()=>{
    const res =await axios.get(`http://localhost:5000/api/users?userId=${post.userId}`);
    // console.log(res);
    setuser(res.data)
  }
  fetchUser();
},[post.userId])
const handleLike=()=>{
  try {
    axios.put("http://localhost:5000/api/posts/"+post._id+"/like",{userId:currentUser._id})
  } catch (error) {
  console.log("error")
  }
  if(isLiked===false){
    setisLiked(true)
  }else{
    setisLiked(false)
  }
  setlike(isLiked===false ? like+1: like-1)
 
}
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
                <img className='postProfileImg' src={user.profilePicture?PF+user.profilePicture : PF+"persons/noAvatar.jpg"} alt="" />
              </Link>
                <span className='PostUsername'>{user.username}</span>
                <span className='PostDate'>{format(post.createdAt)} </span>
            </div>
            <div className="postTopRight">
                <MoreVert/>
            </div>
        </div>
        <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className='postImg' src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
               <ThumbUp  className='likeIconThumb' htmlColor='blue' onClick={handleLike} />
               <Favorite className='likeIconHeart'  htmlColor='red' onClick={handleLike}/>
               <span className='postCounter'>{like} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">{post.Comment}  comments</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Post
