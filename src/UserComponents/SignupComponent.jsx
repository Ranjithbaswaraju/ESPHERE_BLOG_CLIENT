import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
// console.log(BaseUrl,"")

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
      alert(res.data.message);
      console.log(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err, "-------");
      alert("signup failed");
    }
  };
  console.log(form);
  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="enter username"
        onChange={changeHandler}
      />
      <input
        type="email"
        name="email"
        placeholder="enter email"
        onChange={changeHandler}
      />
      <input
        type="text"
        name="password"
        placeholder="enter password"
        onChange={changeHandler}
      />
      <select name="role" onChange={changeHandler}>
        Select User
        <option value="author">Author</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
};
export default SignupComponent;
