
// import allData from "../controller/userController"

import { createBlog, deleteBlog, getAllBlogs, getOneBlog, updateBlog, userBlog } from "../controller/blogController.js";
import { Router } from "express";

const blogRouter = Router();

// Get all blogs
blogRouter.get("/all-blogs", getAllBlogs);

// Get single blog
blogRouter.get("/one-blog/:id", getOneBlog);

// Post blog
blogRouter.post("/create-blog", createBlog);

// Put blog 
blogRouter.put("/update-blog/:id", updateBlog);

// Delete blog
blogRouter.delete("/delete-blog/:id", deleteBlog);

// Get user blog
// blogRouter.get("/user-blog/:id" ,userBlog)


export default blogRouter;