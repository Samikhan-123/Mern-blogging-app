import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ReadBlog = () => {
    const [blog, setBlog] = useState(null);
    const { id } = useParams(); // Use destructuring to get id from useParams

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`/api/v1/blog/one-blog/${id}`);
                if (res.data) {
                    setBlog(res.data.blog);
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || 'Error fetching blog');
            }
        };

        fetchBlog(); // Call the fetchBlog function

    }, [id]); // Include id as a dependency to trigger the effect when it changes

    if (!blog) {
        return <div>Loading...</div>;
    }

    const { image, title, description, user, createdAt } = blog;

    return (
        <div className="fluid-container mt-5 mb-5">
            <div className="card d-flex col-sm-12 col-md-10" style={{ margin: 'auto', marginTop: '2rem', boxShadow: '5px 5px 10px #ccc', backgroundColor: '#e6fbf1' }}>
                <h5 className="card-title mx-3 mt-3"><FaUser className='m-1' />{user.username}</h5>
                <p className="card-text text-muted p-2">Posted at {new Date(createdAt).toLocaleString()}</p>
                <img
                    src={image}
                    className="card-img-top p-1"
                    alt="blog-image"
                    style={{ objectFit: "cover", aspectRatio: "16:9", maxHeight: "400px" }}
                />

                <div className="card-body text-capitalize">

                    <h1 className="card-subtitle mb-2">
                        {title}
                    </h1>
                    <p style={{fontSize:'20px'}} className="card-text pt-4">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReadBlog;
