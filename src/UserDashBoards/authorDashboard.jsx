import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useCallback, useEffect, useState } from "react";
import { BaseUrl } from "../UserComponents/SignupComponent";

const AuthorDashBoard = () => {
  const [blog, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

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
      console.log(res.data.allBlogs);
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
        },
      );
      alert("Blog Created Succesfully");
      setContent("");
      setTitle("");
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

  const updateBlog = async () => {
    try {
      await axios.put(
        `${BaseUrl}/apiPosts/updateBlog/${editId}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("updated");
      getBlogs();
      setContent("");
      setEditContent("");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={createBlog}>Create Blog</button>
      <hr />

      {blog.length == 0 ? (
        <p style={{ color: "red" }}>No Blogs are there</p>
      ) : (
        blog.map((blogs) => {
          return (
            <div
              key={blogs._id}
              style={{
                border: "1px solid black",
                margin: "10px",
                padding: "10px",
              }}
            >
              {/*               
              <h3>{blogs.title}</h3>
              <p>{blogs.content}</p> */}

              {editId === blogs._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={updateBlog}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{blogs.title}</h3>
                  <p>{blogs.content}</p>
                </>
              )}

              {blogs.authorId === user.userId && (
                <>
                  <button
                    onClick={() => {
                      setEditId(blogs._id);
                      setEditTitle(blogs.title);
                      setEditContent(blogs.content);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteBlog(blogs._id)}>
                    Delete My Blog
                  </button>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
export default AuthorDashBoard;
