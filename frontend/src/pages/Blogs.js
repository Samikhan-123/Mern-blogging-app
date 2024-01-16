import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllBlogs = async () => {
        try {
            const response = await axios.get("/api/v1/blog/all-blogs");
            if (response.data) {
                setBlogs(response.data.blogs);
            }
        } catch (error) {
            console.error(error);
            setError("Connection error. Please try again later.",);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div style={{ backgroundColor:'#e6ecf1'}}>
            {loading ? (
                <p className='text-center'>Please wait, loading data...</p>
            ) : error ? (
                <p className='text-center'>{error}</p>
                ) : blogs.length === 0 ? (
                    <p className='text-center'>blogs not found.</p>
                ) : (
                blogs.map((blog) => (
                    <BlogCard
                        isUser={localStorage.getItem("userID") === (blog.user?._id || null)}
                        key={blog.id}
                        id={blog._id}
                        username={blog.user?.username || "Unknown User"}
                        time= {new Date(blog.createdAt).toLocaleString()}
                        image={blog.image}
                        title={blog.title}
                        description={blog.description}
                    />
                ))
            )}
        </div>
    );
};

export default Blogs;
