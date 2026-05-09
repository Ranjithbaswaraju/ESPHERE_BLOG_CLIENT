import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../UserComponents/SignupComponent";
import LogOutComponent from "../UserComponents/logoutComponent";
import { toast } from "react-toastify";

const AdminDashBoard = () => {

  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const token = localStorage.getItem("token");

  // GET BLOGS
  const getBlogs = async () => {

    try {

      const res = await axios.get(
        `${BaseUrl}/apiPosts/getBlog`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(res.data.allBlogs);

    } catch (err) {

      console.log(err);
      toast.error("Unable to fetch blogs");

    }
  };

  // DELETE BLOG
  const deleteBlog = async (id) => {

    try {

      await axios.delete(
        `${BaseUrl}/apiPosts/deleteBlog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog Deleted Successfully");

      getBlogs();

    } catch (err) {

      console.log(err);

      toast.error("Blog Deletion Failed");
    }
  };

  // GET AUTHORS
  const getUsers = async () => {

    try {

      const UserApi = await axios.get(
        `${BaseUrl}/apiUser/getAllUsers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const Authors = UserApi.data.data.filter(
        (user) => user.role === "author"
      );

      setUsers(Authors);

    } catch (err) {

      console.log(err);

      toast.error("Unable to fetch authors");
    }
  };

  useEffect(() => {

    getBlogs();

  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center gap-8 p-8 bg-[#f3f4ff]">

        <LogOutComponent  />

        <div className="flex gap-5">

          <button
            onClick={() => setShowUsers(false)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Blogs
          </button>

          <button
            onClick={() => {
              setShowUsers(true);
              getUsers();
            }}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Authors
          </button>

        </div>

        <h1 className="text-5xl font-extrabold text-[#7c3aed]">
          Welcome to Admin Dashboard
        </h1>

        {
          showUsers ?

            (
              <div className="flex flex-row flex-wrap justify-center items-center gap-6">

                {users.map((user) => {

                  return (

                    <div
                      key={user._id}
                      className="bg-[#ecfeff] w-96 flex flex-col gap-4 p-6 rounded-2xl shadow-lg border border-[#a5f3fc]"
                    >

                      <h2 className="text-2xl text-[#155e75]">
                        <span className="font-bold">Name :</span> {user.username}
                      </h2>

                      <p className="text-[#164e63]">
                        <span className="font-bold">Email :</span> {user.email}
                      </p>

                      <p className="text-[#0f766e]">
                        <span className="font-bold">Role :</span> {user.role}
                      </p>

                    </div>
                  );
                })}
              </div>
            )

            :

            (
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
            )
        }
      </div>
    </>
  );
};

export default AdminDashBoard;