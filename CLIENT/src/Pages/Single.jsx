// import React from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { useState,useEffect, useContext } from 'react'
import axios from 'axios'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../Components/Menu'
import moment from 'moment'
import { AuthContext } from '../Context/Auth_Context'

const Single = () => {
  const [post, setPost] = useState({})


  //useLocation hooks gives us information about our current page. we extract  its search property to help us get the query string
  //we use the pathname property to help us get the userId
  const location = useLocation()
  const navigate= useNavigate()

  const postId = location.pathname.split("/")[2]

  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)


  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`)
        console.log(res.data)
        setPost(res.data)
        
      } catch (error) {
        console.log(error)
        
      }
    }

    fetchData();
  },[postId])
  
  console.log(post)

  const handleDelete = async()=>{
    try {

      await axios.delete(`http://localhost:8800/api/posts/${postId}`,{withCredentials:true})
      navigate("/")

      
    } catch (error) {
      console.log(error)
      
    }

  }


  return (
    <div className="single">
      <div className="content">
        <img src={post.img && `../upload/${post.img}`} />
      <div className="user">
        {post.userImage && <img src={post.userImage} />}
      <div className="info">
        <span>{post?.username}</span>
        <p>Posted {moment(post?.date).fromNow()}</p>
      </div>
      {currentUser?.username===post.username && <div className="edit">

        
      {/* when you click the edit button it will take the post and populate the write page */}

        <Link to={`/write?edit=2`} state={post} >
        <img src={Edit} alt="edit icon" />
        </Link>
        <img onClick={handleDelete} src={Delete} alt="delete icon" />
      </div>}
      </div>
      <h1>{post.title}</h1>
      {/* we skip using the paragraph tag cause rich editor has a p.tag */}
      {post.postdesc}


      </div>
      <Menu cat={post.cat}/>

     

    </div>
  )
}

export default Single