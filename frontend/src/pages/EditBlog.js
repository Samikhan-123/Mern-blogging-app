import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = () => {
    const [blog, setBlog] = useState({});
    const { id } = useParams();
    console.log("params:",id); // Log the entire params object

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        image: Yup.string().required("Image URL is required"),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            image: "",

        },
        validationSchema,
        onSubmit: async (values) => {

            try {
                const response = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                    title: values.title,
                    description: values.description,
                    image: values.image,
                });

                const { data } = response || {}; // Check if response is available
                if (data && data.success) {
                    toast.success("Blog Updated");
                    navigate("/my-blogs");
                } else {
                    toast.error("Failed to update blog");
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "Server error");
            }

        },
        
    });

    // get blog details
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/one-blog/${id}`);
            if (data?.blog) {
                setBlog(data.blog);
                formik.setValues({
                    title: data.blog.title,
                    description: data.blog.description,
                    image: data.blog.image,
                });
            } else {
                console.log("Blog not found in the API response");
                toast.info("Blog not found")
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    console.log('blog',blog)

    useEffect(() => {
        getBlogDetail();
    }, [id]);
    const formattedDateTime = new Date(blog.createdAt).toLocaleString(); // Format createdAt date

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Update A Post</h2>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">
                        Created At
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="time"
                        name="time"
                        value={formattedDateTime}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : ""
                            }`}
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    <div className="invalid-feedback">{formik.errors.title}</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className={`form-control ${formik.touched.description && formik.errors.description
                            ? "is-invalid"
                            : ""
                            }`}
                        id="description"
                        rows="3"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    ></textarea>
                    <div className="invalid-feedback">{formik.errors.description}</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image URL
                    </label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.image && formik.errors.image ? "is-invalid" : ""
                            }`}
                        id="image"
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                    />
                    <div className="invalid-feedback">{formik.errors.image}</div>
                </div>

                <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={
                        formik.isSubmitting || Object.keys(formik.errors).length > 0
                    }
                >
                    UPDATE
                </button>
            </div>
        </form>
    );
};

export default EditBlog;
