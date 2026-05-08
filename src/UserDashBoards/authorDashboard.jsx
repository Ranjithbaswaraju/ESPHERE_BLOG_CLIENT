import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../UserComponents/SignupComponent";

const AuthorDashBoard = () => {
  const [blog, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/apiPosts/getBlog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(res.data.allBlogs);
    } catch (err) {
      alert(err.message);
    }
  };

  const createBlog = async () => {
    try {
      await axios.post(
        `${BaseUrl}/apiPosts/postBlog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog Created Successfully");

      setTitle("");
      setContent("");

      getBlogs();
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
      alert(err.message);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 p-6 bg-[#f3f4ff]">
      
      <h1 className="text-4xl font-extrabold text-blue-500">
        WellCome to Author Dashboard
      </h1>

      <div className="bg-white w-96 flex flex-col gap-4 p-6 rounded-xl shadow-md">
        
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full p-2"
        />

        <input
          type="text"
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded w-full p-2"
        />

        <button
          onClick={createBlog}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Blog
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {blog.length === 0 ? (
          <p className="text-red-500 text-xl">No Blogs Available</p>
        ) : (
          blog.map((blogs) => {
            return (
              <div
                key={blogs._id}
                className="bg-white w-80 p-5 rounded-xl shadow-md border"
              >
                <h3 className="text-2xl font-bold mb-3">
                  {blogs.title}
                </h3>

                <p className="mb-4 text-gray-700">
                  {blogs.content}
                </p>

                {blogs.authorId === user.userId && (
                  <button
                    onClick={() => deleteBlog(blogs._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete My Blog
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AuthorDashBoard;