import axios from "axios";
import React, { useState } from "react";
import { BaseUrl } from "./SignupComponent";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SignInComponent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const SubmitHandler = async () => {
    try {
      const res = await axios.post(`${BaseUrl}/apiUser/LoginUser`, form);


      const token = res.data.token;

      localStorage.setItem("token", token);

      const user = jwtDecode(token);

      if (user.role == "admin") {
        navigate("/admin");
      } else if (user.role == "author") {
        navigate("/author");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data);

      alert(err.response.data.message)
      
    }
  };

  return (
    <>
    
      <div className="min-h-screen flex justify-center items-center bg-[oklch(98.2%_0.018_155.826)]">
        
        <form 
        onSubmit={(e)=>{
          e.preventDefault()
          SubmitHandler()
        }}
        className=" w-90 bg-white flex flex-col gap-5 p-6 rounded-xl  shadow-md ">
          <p className="text-3xl font-bold text-red-400 text-center">Login Form</p>
          <input
            type="email"
            placeholder="Enter Email"
            
            name="email"
            onChange={changeHandler}
            className="border rounded w-full p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Enter Password"
            name="password"
            onChange={changeHandler}
            className="border rounded w-full p-2 mb-6"
          />
          <span className="font-serif">Don't have account ?  <a className="text-red-500 underline" href="./signup">Register</a></span>
          <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600" onClick={()=>SubmitHandler()}>Login</button>
        </form>
      </div>
    </>
  );
};
export default SignInComponent;
