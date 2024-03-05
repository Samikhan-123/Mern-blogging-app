import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { useState } from 'react';

const BlogCard = ({ isUser, id, username, time, image, title, description }) => {
    const [allBlogs, setAllBlogs] = useState([]);

    const navigate = useNavigate()
    const handleEdit = () => {
        navigate(`/edit-blog/${id}`)
    }

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("/api/v1/blog/all-blogs");
            if (response?.data) {
                // Update the state with the latest data
                setAllBlogs(response.data);
                console.log('data',response.data)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
            if (response && response?.data) {
                await fetchBlogs();

                console.log('delete', response.data)
                window.location.reload();
                toast.info('Blog Deleted');



            } else {
                toast.error('Failed to delete blog. Please try again.');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="card d-flex mb-4 col-md-6 col-sm-12" style={{ margin: 'auto', backgroundColor:'#e6fbf1', boxShadow: '5px 5px 10px #ccc' }}>
            {isUser && (
                <div className="d-flex justify-content-end align-items-center m-2">
                    <button className="btn btn-primary mx-2" onClick={handleEdit}>
                        <FaEdit /> Edit
                    </button>
                    <button
                        className="btn btn-danger delete"
                        onClick={() => {
                            if (  window.confirm(
                                    'Are you sure to delete data?'
                                )
                            ) {
                                handleDelete();

                            }
                        }}
                    >
                        <MdDeleteForever /> Delete
                    </button>
                </div>

            )}

           
            <Link className="nav-link" to={`/read-blog/${id}`}>
                <img src={image} className="card-img-top" alt="blog-image" height="350" />
            </Link>

            <div className="card-body">

                <h2 className="card-subtitle mb-2"><span className='fw-bold'> </span> {title}</h2>
                <p className="card-text">description ... </p>
                <p className="card-text">
                    <small className="text-muted">Posted by <FaUser className='mb-1 mx-1' /><span style={{ color: "red" }}> {username} </span>  on {time}</small>
                </p>
                <Link className="nav-link" to={`/read-blog/${id}`}>
                    <button class="btn btn-primary fw-bold " style="transition: all 0.5s;">
                        read more
                    </button>
                </Link>
               

            </div>
        </div>
    );
}


export default BlogCard;
