import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import Carousels from '../components/Carousels';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllBlogs = async () => {
        try {
            const response = await axios.get("https://mern-blogging-app.vercel.app/api/v1/blog/all-blogs");
            if (response.data) {
                setBlogs(response.data.blogs);
            }
        } catch (error) {
            console.error(error);
            setError("Connection error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <>
            <Carousels />

            <div className="container">
                <h2 className='text-center p-4 fw-bold'>The Blogs</h2>
                <div className="d-flex justify-content-around flex-wrap">
                    {loading ? (
                        <h4 className='text-center'>Please wait, loading data...</h4>
                    ) : error ? (
                        <h4 className='text-center'>{error},error</h4>
                    ) : blogs.length === 0 ? (
                        <h4 className='text-center'>Blogs not found.</h4>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog._id} className="col-md-5 mb-4 ">
                                <BlogCard
                                    isUser={localStorage.getItem("userID") === (blog.user._id || null)}
                                    id={blog._id}
                                    username={blog.user?.username || "Unknown User"}
                                    time={new Date(blog.createdAt).toLocaleString()}
                                    image={blog.image}
                                    title={blog.title}
                                    description={blog.description}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Blogs;
