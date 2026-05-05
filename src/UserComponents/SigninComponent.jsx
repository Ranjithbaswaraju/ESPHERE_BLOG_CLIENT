import axios from "axios";
import React, { useState } from "react";
import { BaseUrl } from "./SignupComponent";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SignInComponent = () => {
    const navigate=useNavigate()
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

    //   localStorage.setItem("token", res.data.token);
    //   alert(res.data.message);
    //   console.log(res.data.message);

    const token=res.data.token

    localStorage.setItem("token",token)

    const user=jwtDecode(token)

      if(user.role=="admin"){
        navigate("/admin")
      }
      else if(user.role=="author"){
        navigate("/author")
      }
      else{
        navigate("/")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <input type="email" name="email" onChange={changeHandler} />
      <input type="text" name="password" onChange={changeHandler} />
      <button onClick={SubmitHandler}>Login</button>
    </>
  );
};
export default SignInComponent;
