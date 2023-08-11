import React, { useContext, useRef, useState } from 'react'
import './Share.css'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

const Share = () => {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file, setfile] = useState(null);

    const submitHandler=async(e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        if(file){
            const data=new FormData();
            const fileName=Date.now()+file.name;
            data.append("name",fileName);
            data.append("file",file);
            newPost.img=fileName;
            try {
                await axios.post("http://localhost:5000/api/upload",data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await axios.post("http://localhost:5000/api/posts",newPost);
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture ? PF + user.profilePicture : PF + "persons/noAvatar.jpg"} alt="" />
                    <input type="text" ref={desc} className='shareInput' placeholder={'whats in your mind ' + user.username + "?"} />
                </div>
                <hr className='shareHr' />
                {file && (
                    <div className="shareImgContainer">
                        <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
                        <Cancel className='shareCancelImg' onClick={()=>setfile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareoption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo/Video</span>
                            <input type="file" style={{ display: "none" }} id='file' accept='.png,.jpg,.jpeg' onChange={(e) => setfile(e.target.files[0])} />
                        </label>
                        <div className="shareoption">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareoption">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareoption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button type='submit' className='shareButton'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
