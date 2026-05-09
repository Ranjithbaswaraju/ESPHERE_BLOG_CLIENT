import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseUrl } from "./SignupComponent";

const LogOutComponent = () => {

  const navigate = useNavigate();

  const handleClick = async () => {

    try {

      const response = await axios.get(
        `${BaseUrl}/apiUser/logoutUser`
      );

      console.log(response.data);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("User logged out Successfully");

      navigate("/login");

    } catch (err) {

      console.log(err);

      toast.error("Logout Failed");
    }
  };

  return (
    <div className="absolute top-5 right-5">

      <button
        onClick={handleClick}
        className="bg-blue-400 text-white px-6 py-2 rounded-xl hover:bg-red-400 transition-all"
      >
        Logout
      </button>

    </div>
  );
};

export default LogOutComponent;