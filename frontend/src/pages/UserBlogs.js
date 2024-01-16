import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const UserBlog = () => {
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = async () => {
        try {
            const response = await axios.get("/api/v1/blog/all-blogs");
            if (response.data && response.data.blogs) {
                setBlogs(response.data.blogs);
                console.log(response.data)
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                        id={blog._id} // each blog has a unique ID
                        isUser={true}
                        username={blog.user?.username}
                        time={blog.createdAt}
                        image={blog.image}
                        title={blog.title}
                        description={blog.description}
                    />
                ))
            ) : (
                <p className='text-center'>blogs not found</p>
            )}
        </div>
    );
};

export default UserBlog;
