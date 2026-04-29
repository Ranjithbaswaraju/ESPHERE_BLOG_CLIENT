
import React, { useState } from "react";
import { BaseUrl } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
console.log(BaseUrl)
const SignupComponent=()=>{
    // const navigate=useNavigate()

    const[form,setForm]=useState({
        username:"",
        email:"",
        password:"",
        role:"author"
    })

    const changeHandler=(e)=>{
        setForm({...form,[e.target.username]:[e.target.value]})
    }

    const handleSubmit=async()=>{
        try{
            const res=await axios.post(`${BaseUrl}/apiUser/SignupUser`,form)
            alert(res.data.message)
            console.log(res.data.message)
        }
        catch(err){
            console.log(err)
            alert("signup failed")
        }
    }
    return(
        <div>
        <input type="text" placeholder="enter username" onChange={changeHandler}>Username</input>
        <input type="email" placeholder="enter email" onChange={changeHandler}>Email</input>
        <input type="text" placeholder="enter password" onChange={changeHandler}>Password</input>
        <select name="role" onChange={changeHandler}>Select User
            <option value='author'>Author</option>
            <option value='admin'>Admin</option>
        </select>
        <button onClick={handleSubmit}>Signup</button>
        </div>
    )
}
 export default SignupComponent