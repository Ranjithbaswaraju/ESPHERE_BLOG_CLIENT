import React from "react"
import SignupComponent from "./UserComponents/SignupComponent"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignInComponent from "./UserComponents/SigninComponent"
import AdminDashBoard from "./UserDashBoards/adminDashboard"
import AuthorDashBoard from "./UserDashBoards/authorDashboard"



function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupComponent />} /> 
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/login" element={<SignInComponent />} />
        <Route path="/admin" element={<AdminDashBoard/>}/>
        <Route path="/author" element={<AuthorDashBoard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
