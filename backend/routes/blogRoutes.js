
// import allData from "../controller/userController"

import { createBlog, deleteBlog, getAllBlogs, getOneBlog, updateBlog, userBlog } from "../controller/blogController.js";
import { Router } from "express";
import verifyToken from "../middlewares/JsonWebAuth.js";

const blogRouter = Router();

// Get all blogs
blogRouter.get("/all-blogs", verifyToken, getAllBlogs);

// Get single blog
blogRouter.get("/one-blog/:id", verifyToken, getOneBlog);

// Post blog
blogRouter.post("/create-blog", verifyToken, createBlog);

// Put blog 
blogRouter.put("/update-blog/:id", verifyToken, updateBlog);

// Delete blog
blogRouter.delete("/delete-blog/:id", verifyToken, deleteBlog);

// Get user blog
// blogRouter.get("/user-blog/:id" ,userBlog)


export default blogRouter;