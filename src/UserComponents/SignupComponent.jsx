import React, { useState } from "react";
import "../index.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const BaseUrl = "https://esphere-blog-server-1.onrender.com";
const SignupComponent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "author",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${BaseUrl}/apiUser/SignupUser`, form);
      // alert(res.data.message);
      console.log(res.data.message);
      navigate("/login");
      toast.success("User Registered Successfully");
    } catch (err) {
      console.log(err.response.data);
      // alert(err.response.data.message)
      toast.error("Registration Failed");
    }
  };
  console.log(form);
  return (
    <div className="min-h-screen flex justify-center items-center bg-[oklch(98.2%_0.018_155.826)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white w-96 flex flex-col gap-5 p-6 rounded-xl shadow-md "
      >
        <p className="text-3xl font-bold text-red-500 text-center">
          Registration Form
        </p>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          onChange={changeHandler}
          className="border rounded w-full p-2 mb-6"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={changeHandler}
          className="border rounded w-full p-2 mb-6"
        />
        <input
          type="text"
          name="password"
          placeholder="Enter password"
          onChange={changeHandler}
          className="border rounded w-full p-2 mb-6"
        />
        <select
          name="role"
          onChange={changeHandler}
          className="border rounded w-full p-2 mb-6"
        >
          Select User
          <option value="author">Author</option>
          <option value="admin">Admin</option>
        </select>
        <span className="font-serif">
          Already have an account ?
          <Link to="/login" className="text-blue-500 ml-2">
            Login
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Signup
        </button>
      </form>
    </div>
  );
};
export default SignupComponent;
