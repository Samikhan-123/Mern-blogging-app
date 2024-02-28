import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch()
  

    // Form validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,

        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post("https://mern-blogging-app.vercel.app/api/v1/user/login", {
                    email: values.email,
                    password: values.password
                });
                // console.log('Login Response:', response.data);

                const userData = response.data.user;
                const token = response.data.token; // Get the token from the server

                if (userData && userData._id && token) {
                    localStorage.setItem("userID", userData._id);

                    // console.log('Received Token:', token);

                    localStorage.setItem("token", token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    dispatch(authActions.login());
                    
                    // console.log('Form values:', values);
                    navigate('/blogs');
                    toast.success("Successfully Login");
                }
            } catch (error) {
                console.error("Login error:", error);
                console.log(error);

                if (error.response) {
             
                    console.log(error.message)
                    toast.error(error.response.data.message);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received");
                    toast.error("No response received");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error setting up the request:", error.message);
                    toast.error("Error setting up the request");
                }
            } finally {
                setSubmitting(false);
            }
        },
    });
   

    return (
        <div>
            <section className="vh-125" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: '1rem 0 0 1rem' }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                    <span className="h1 fw-bold mb-0">BlogFolio</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                                    Log into your account
                                                </h5>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="email">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                                    ) : null}
                                                </div>
                                                <div className="form-outline mb-4" style={{ position: 'relative' }}>
                                                    <label className="form-label" htmlFor="password">
                                                        Password
                                                    </label>
                                                    <div className="input-group">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="password"
                                                            id="password"
                                                            className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.password}
                                                        />
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            {showPassword ? 'Hide' : 'Show'}
                                                        </button>
                                                        {formik.touched.password && formik.errors.password ? (
                                                            <div className="invalid-feedback">{formik.errors.password}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button type="submit" className="btn btn-primary btn-lg d-flex w-100 justify-content-center mb-2" disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>
                                                        Login
                                                    </button>
                                                    {/* //google authentication for redirect login */}
                                                    {/* <GoogleOAuthProvider clientId="1084732114493-dd1srhfsog3f11iivd7ckppn9255j3gn.apps.googleusercontent.com">
                                                        <GoogleLogin
                                                            onSuccess={credentialResponse => {
                                                                const decoded = jwtDecode(credentialResponse.credential);

                                                                console.log(decoded);
                                                            }}
                                                            onError={() => {
                                                                console.error('Login Failed');
                                                            }}

                                                        />
                                                    </GoogleOAuthProvider> */}

                                                </div>
                                                <Link to="#!" className="small text-muted">
                                                    Forgot password?
                                                </Link>
                                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                                    Don't have an account?
                                                    <Link to="/register" style={{ color: '#393f81' }}>
                                                        Register here
                                                    </Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
