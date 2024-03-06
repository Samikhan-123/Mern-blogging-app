import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard.js';

const UserBlog = (props) => {
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = async () => {
        try {
            const id = localStorage.getItem('userID');
            const { data } = await axios.get(`https://mern-blogging-app.vercel.app/api/v1/blog/user-blog/${id}`);
            if (data && data.userBlogs?.blogs) {
                setBlogs(data.userBlogs.blogs);
            }
        } catch (error) {
            console.error('userBlog error', error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div>
            <h2 className='text-center fw-bold m-5'>My Blogs</h2>
            <div className="d-flex justify-content-around flex-wrap">
                {blogs && blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className="col-md-5 mb-4 gap-5">
                            <BlogCard
                                id={blog._id}
                                isUser={true}
                                username={blog.user?.username}
                                time={new Date(blog.createdAt).toLocaleString()}
                                image={blog.image}
                                title={blog.title}
                                description={blog.description}
                            />
                        </div>
                    ))
                ) : (
                    <h4 className='text-center'>Blogs not found, create a blog</h4>
                )}
            </div>
        </div>
    );
};

export default UserBlog;
