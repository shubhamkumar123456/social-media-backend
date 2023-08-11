import React, { useContext, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./Centerbar.css";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Centerbar = ({ username }) => {
  const [posts, setposts] = useState([]);
  const {user}=useContext(AuthContext)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(
            "http://localhost:5000/api/posts/profile/"+username
          )
        : await axios.get(
            "http://localhost:5000/api/posts/timeline/"+user._id
          );
      // console.log(res.data);
      setposts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)- new Date(p1.createdAt)
      }));
    };
    fetchPosts();
  }, [username,user._id]);
  return (
    <div className="Centerbar">
      <div className="centerbarWrapper">
      {(!username ||username===user.username) && <Share />}
        {posts.map((p) => {
          return <Post key={p._id} post={p} />;
        })}
      </div>
    </div>
  );
};

export default Centerbar;
