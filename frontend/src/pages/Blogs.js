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
        <div style={{ backgroundColor: '#e6ecf1' }}>
            <h2 className='text-center p-3'> The Blogs </h2>
            {loading ? (
                <h4 className='text-center'>Please wait, loading data...</h4>
            ) : error ? (
                <h4 className='text-center'>{error}</h4>
                ) : blogs.length === 0 ? (
                    <h4 className='text-center'>blogs not found.</h4>
                ) : (
                blogs.map((blog) => (
                    <BlogCard
                        // isUser={localStorage.getItem("userID") === (blog.user._id || null)}
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
