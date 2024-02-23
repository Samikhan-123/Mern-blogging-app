// blogController.js

import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";
// Get | all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");

        if (!blogs) {
            return res.status(404).json({
                success: false,
                message: "Blogs Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            blogsCount: blogs.length,
            message: "All Blogs List",
            blogs
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Failed to Get Blogs",
            error
        })
    }
};


// Get | blog
export const getOneBlog = async (req, res) => {

    try {
        const id = req.params.id;
        console.log('Blog ID:', id);

        if (!id) {
            return res.status(400).json('Invalid blog id');
        }
        // Check if blog exists
        const blog = await blogModel.findById(id).populate("user");
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        // Return the found blog
        return res.status(200).json({
            success: true,
            message: 'Blog found', 
            blog,
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error: Something went wrong while processing the request.',
            error: error.message, 
        });
    }
}


// Put | one blog
export const createBlog = async (req, res) => {
    try {
        const { title, description, image, user } = req.body
        if (!title || !description || !image || !user) {
            return res.status(400).json({
                success: false,
                message: "Please Provide All fields(title, description, image, user)"
            })
        }

        const existingUser = await userModel.findById(user)
        // validation
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Unable to Find User"
            })
        }

        // save blog
        const newBlog = new blogModel({ title, description, image, user })
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({ session })
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session })
        await session.commitTransaction()
        await newBlog.save()
        return res.status(201).json({
            success: true,
            message: "Blog Successfully Created",
            newBlog
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Failed to Create Blog",
            error
        })
    }
};


// Update | blog
export const updateBlog = async (req, res) => {
    try {
        const id = req.params.id
        console.log('updateId',id)
        const { title, description, image } = req.body
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).json({
            success: true,
            message: "Blog Successfully Updated",
            blog
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Failed to Update Blog",
            error
        })

    }
}
// Delete | blog
export const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Blog ID:', id);

        
        const deletedBlog = await blogModel.findByIdAndDelete(id).populate("user");
        if (!deletedBlog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
        }

        // Check if user and blogs are populated
        // if (deletedBlog.user && deletedBlog.user.blogs) {
        //     // Remove the deleted blog from the user's blogs array
        //     deletedBlog.user.blogs.pull(id);
        //     await deletedBlog.user.save();
        // }

        return res.status(200).json({
            success: true,
            message: 'Blog Successfully Deleted',
            blog: deletedBlog,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to Delete Blog',
            error,
        });
    }
};


// Get user blog using id 
export const userBlog = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const userBlogs = await userModel.findById(id).populate("blogs")
        if (!userBlogs) {
            return res.status(404).json({
                success: false,
                message: "user Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "user Successfully Get",
            userBlogs,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Failed to Get this user",
            error
        })

    }
}


