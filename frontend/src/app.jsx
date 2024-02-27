import "./app.css"; 
import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlog from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import ReadBlog from "./pages/ReadBlog";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlog />} />
        <Route path="/read-blog/:id" element={<ReadBlog />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export { App };
