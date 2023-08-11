import axios from 'axios'
import React from 'react'
import Centerbar from '../../components/centerbar/Centerbar'
import Leftbar from '../../components/leftbaar/Leftbar'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import { useEffect,useState } from 'react'
import {useParams} from 'react-router'
import './Profile.css'
const Profile = () => {
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setuser] = useState({});
    const username=useParams().username
    useEffect(() =>{
        const fetchUser=async()=>{
          const res =await axios.get(`http://localhost:5000/api/users?username=${username}`);
        //   console.log(res.data);
          setuser(res.data);
        }
        fetchUser();
      },[username])
      
    return (
        <>
            <Navbar />
            <div className="profile">
                <Leftbar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src={user.coverPicture?PF+user.coverPicture:PF+"persons/noCover.jpg"} alt="" />
                            <img className='profileUserImg'  src={user.profilePicture?PF+user.profilePicture:PF+"persons/noAvatar.jpg"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Centerbar username={username}/>
                        <Rightbar user={{user}}/>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Profile
