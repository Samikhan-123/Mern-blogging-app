import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const Register = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const navigate = useNavigate();

    // form validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(/^[A-Za-z ]+$/, 'Name should only contain letters and spaces')
            .min(3, 'Name must be at least 3 characters')
            .required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            // Handle form submission here
            // console.log('Form values:', values);
            try {
                const { data } = await axios.post('https://mern-blogging-app.vercel.app/api/v1/user/register', {
                    username: values.name,
                    email: values.email,
                    password: values.password,
                });

                if (data) {

                    navigate('/login');
                    toast.success('Successfully Registered');

                } else {
                    // Registration failed, display error message
                    toast.error("Registering Error");
                }
            } catch (error) {
                console.log(error);
                // Handle other errors, if needed
                toast.error('error while connecting');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div>
            <section className="vh-125" style={{ backgroundColor: '#9A616D' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-2 p-lg-5 text-black">
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                    <span className="h1 fw-bold mb-0">BlogFolio</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                                    Create your account
                                                </h5>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="name">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formik.values.name}
                                                        id="name"
                                                        className={`form-control form-control-lg ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''
                                                            }`}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.touched.name && formik.errors.name ? (
                                                        <div className="invalid-feedback">{formik.errors.name}</div>
                                                    ) : null}
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="email">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formik.values.email}
                                                        id="email"
                                                        className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                                                            }`}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                                    ) : null}
                                                </div>
                                                {/* // password input  */}
                                                <div className="form-outline mb-4" style={{ position: 'relative' }}>
                                                    <label className="form-label" htmlFor="password">
                                                        Password
                                                    </label>
                                                    <div className="input-group">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="password"
                                                            value={formik.values.password}
                                                            id="password"
                                                            className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                                            onChange={formik.handleChange}
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


                                                <div className="pt-1 mb-4 justify-content-center">
                                                    <button type="submit" className="btn btn-primary btn-lg d-flex w-100 justify-content-center mb-4" disabled={formik.isSubmitting}>
                                                        Register
                                                    </button>
                                                    {/* //google authentication for redirect login */}
                                                    {/* <GoogleOAuthProvider clientId="1084732114493-dd1srhfsog3f11iivd7ckppn9255j3gn.apps.googleusercontent.com">
                                                        <GoogleLogin
                                                            onSuccess={credentialResponse => {
                                                                toast.success('Successfully Login')
                                                                const decoded = jwtDecode(credentialResponse.credential);
                                                                console.log(decoded);
                                                            }}
                                                            onError={() => {
                                                                console.error('Login Failed');
                                                            }}
                                                        />
                                                    </GoogleOAuthProvider> */}

                                                </div>

                                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                                    Already have an account?
                                                    <Link to="/login" style={{ color: '#393f81' }}>
                                                        Login here
                                                    </Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            className="img-fluid"
                                            alt="registration form"
                                        />
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

export default Register;
