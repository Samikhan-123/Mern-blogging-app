import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const isLogin = useSelector((state) => state.isLogin);

    return (
        <div className="container-fluid p-0">
            <div
                className="theme-one d-flex justify-content-center align-items-center position-relative"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1556888335-95371827d5fb?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                    backgroundSize: 'cover',
                    width: '100%',
                    minHeight: '100vh',
                    overflowX: 'hidden',
                    backgroundAttachment: 'fixed',
                    color: 'white',
                    fontSize: '20px',
                    textAlign: 'justify'

                }}
            >

                <div className=" col-md-10 col-sm-12 col-xs-12 content text-center position-absolute shadow p-2 text-justify">
                    {!isLogin && (
                        <Link to="/login" className="create-blogs btn btn-warning mb-4 text-light bg-dark" data-mdb-ripple-init>CREATE BLOGS</Link>
                    )}
                    <h2>Create Your Blogs</h2>
                    <p>
                        Start sharing your thoughts and experiences by creating your own blogs.
                        Let your creativity flow and connect with the world through your writings.
                    </p>
                </div>
            </div>

            <div
                className="theme-two d-flex justify-content-center align-items-center position-relative"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1422207258071-70754198c4a2?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                    backgroundSize: 'cover',
                    width: '100%',
                    minHeight: '100vh',
                    overflowX: 'hidden',
                    backgroundAttachment: 'fixed',
                    color: 'white',
                    fontSize: '20px',



                }}
            >
                <div className="col-md-10 col-sm-12 col-xs-12 content text-center position-absolute shadow p-2 text-justify">
                    <h2>Discover Exciting Blog Ideas</h2>
                    <p>
                        Explore a world of possibilities and find inspiration for your blogs.
                        From travel adventures to insightful reflections, discover unique ideas
                        to make your blogs stand out and captivate your audience.
                    </p>
                </div>
            </div>

            <div
                className="theme-three d-flex justify-content-center align-items-center position-relative"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1556888335-23631cd2801a?q=80&w=1453&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                    backgroundSize: 'cover',
                    width: '100%',
                    minHeight: '100vh',
                    overflowX: 'hidden',
                    backgroundAttachment: 'fixed',
                    color: 'white',
                    fontSize: '20px',
                    textAlign: 'justify'


                }}
            >
                <div className="col-md-10 col-sm-12 col-xs-12 content text-center position-absolute shadow p-2 text-justify">
                    <h2>Explore Blogging Adventures</h2>
                    <p>
                        Embark on a journey of blogging adventures. Share your stories,
                        gain insights, and connect with a community of like-minded individuals.
                    </p>
                </div>
            </div>

            <footer className="bg-dark text-center text-white">


                {/* <!-- Copyright --> */}
                <div className="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
                    © 2024 Copyright: BlogFolio
                </div>
            </footer>

        </div>

    );
};

export default LandingPage;
