import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard.js';

const UserBlog = () => {
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = async () => {
        try {
            const id = localStorage.getItem('userID');
            const { data } = await axios.get(`https://mern-blogging-app.vercel.app/api/v1/blog/user-blog/${id}`);
            if (data && data.userBlogs) {
                setBlogs(data.userBlogs);
                console.log('userBlog', data);
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
            <BlogCard />

            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        id={blog._id}
                        username={blog.user?.username}
                        time={new Date(blog.createdAt).toLocaleString()}
                        image={blog.image}
                        title={blog.title}
                        description={blog.description}
                    />
                ))
            ) : (
                <h4 className='text-center'>Blogs not found, create a blog</h4>
            )}
        </div>
    );
};

export default UserBlog;
