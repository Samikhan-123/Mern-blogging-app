import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';


const CreateBlog = () => {
    const navigate = useNavigate();

    const userId = localStorage.getItem('userID');
    if (!userId) {
        // Handle the case where userId is not available (e.g., redirect to login page)
        toast.error('User ID not available. Please log in.');
        navigate('/login'); 
        return;
    }

    const initialValues = {
        title: '',
        description: '',
        image: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required').min(2).max(50),
        description: Yup.string().required('Description is required').min(5),
        image: Yup.string().required('Image URL is required'),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const { data } = await axios.post('/api/v1/blog/create-blog', {
                title: values.title,
                description: values.description,
                image: values.image,
                user: userId,
            });

            if (data?.success) {
                navigate('/my-blogs');
                toast.success('Item Successfully Created');

            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message ||'Failed to Create');


        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Create A Post</h2>
                <div className="mb-3">
                    <label htmlFor="formTitle" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                        id="formTitle"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="invalid-feedback">{formik.errors.title}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="formDescription" className="form-label">
                        Description
                    </label>
                    <textarea
                        className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                        id="formDescription"
                        rows="3"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    ></textarea>
                    {formik.touched.description && formik.errors.description && (
                        <div className="invalid-feedback">{formik.errors.description}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="formImage" className="form-label">
                        Image URL
                    </label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                        id="formImage"
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.image && formik.errors.image && (
                        <div className="invalid-feedback">{formik.errors.image}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CreateBlog;
