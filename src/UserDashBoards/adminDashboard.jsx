import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../UserComponents/SignupComponent";

const AdminDashBoard=()=>{
    const[blogs,setBlogs]=useState([])

    const token=localStorage.getItem("token")

    const getBlogs=async()=>{
        try{
            const res=await axios.get(`${BaseUrl}/apiPosts/getBlog`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(res.data.allBlogs,"api response")
            setBlogs(res.data.allBlogs)
        }   
        catch(err){
            alert(err.message)
        }
    }

    const deleteBlog=async(id)=>{
        try{
            await axios.delete(`${BaseUrl}/apiPosts/deleteBlog/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            alert("blog deleted")
            getBlogs()
        }
        catch(err){
            console.log(err)
            alert("Delete failed")
        }
    }
    useEffect(() => {
    getBlogs()
  }, [])

  return(
    <div>
        <h2>Admin Dashboard</h2>
        {
            blogs.map((blog)=>{
                return(
                    <div key={blog._id} style={{border: "1px solid black", margin: "10px", padding: "10px" }}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <button onClick={()=>deleteBlog(blog._id)}>Delete Blog</button>
                    </div>
                )
            })
        }

    </div>


  )
}
export default AdminDashBoard