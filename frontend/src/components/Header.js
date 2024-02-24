import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/store';
import { toast } from 'react-toastify';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.isLogin);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            try {
                localStorage.clear();
                dispatch(authActions.logout());
                navigate("/login");
                toast.success("Successfully Logout");
            } catch (error) {
                console.error('Error during logout:', error);
                toast.error(error.response?.data?.message || 'Logout failed');
            }
        }
    };
   
    return (
        <div>
            <nav className={`navbar navbar-expand-lg w-100 bg-light`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">

                        <span style={{
                            color: 'red', textShadow: ' 2px 2px 4px #FF0000'
                        }}>
                            BlogFolio
                        </span>
                    </Link>

                    <button
                        style={{ color: 'white' }}
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span style={{ color: 'white',backgroundColor:'white' }}
                            className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul style={{position:'absolute',left:'40%'}} className="navbar-nav">
                            {isLogin && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/blogs" activeClassName="active">
                                            Blogs
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/my-blogs">
                                            My Blogs
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/create-blog">
                                            Create Blogs
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                {!isLogin && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {isLogin && (
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="nav-link">
                                            Logout
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
