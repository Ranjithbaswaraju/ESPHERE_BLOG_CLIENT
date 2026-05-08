import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../UserComponents/SignupComponent";

const AdminDashBoard = () => {
  const [blogs, setBlogs] = useState([]);

  const token = localStorage.getItem("token");

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/apiPosts/getBlog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.allBlogs, "api response");

      setBlogs(res.data.allBlogs);
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/apiPosts/deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Blog Deleted");

      getBlogs();
    } catch (err) {
      console.log(err);

      alert("Delete Failed");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center gap-8 p-8 bg-[#f3f4ff]">
        
        <h1 className="text-5xl font-extrabold text-[#7c3aed]">
        Wellcome to   Admin Dashboard
        </h1>

        <div className="flex flex-row flex-wrap justify-center items-center gap-6">
          {blogs.map((blog) => {
            return (
              <div
                key={blog._id}
                className="bg-[#fff7ed] w-96 flex flex-col gap-4 p-6 rounded-2xl shadow-lg border border-[#fed7aa]"
              >
                <h3 className="text-xl text-[#9a3412]">
                  <span className="font-bold">Title :</span> {blog.title}
                </h3>

                <p className="text-[#7c2d12]">
                  <span className="font-bold">Content :</span> {blog.content}
                </p>

                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="bg-[#f87171] text-white px-4 py-2 rounded-lg hover:bg-[#ef4444] w-40"
                >
                  Delete Blog
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;