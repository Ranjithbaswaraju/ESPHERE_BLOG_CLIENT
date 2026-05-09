import React from "react";
import SignupComponent from "./UserComponents/SignupComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInComponent from "./UserComponents/SigninComponent";
import AdminDashBoard from "./UserDashBoards/adminDashboard";
import AuthorDashBoard from "./UserDashBoards/authorDashboard";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<SignupComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/login" element={<SignInComponent />} />
            <Route path="/admin" element={<AdminDashBoard />} />
            <Route path="/author" element={<AuthorDashBoard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
