import React from "react";
import './Nav.css';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';

const Nav = () => {
    let user = useSelector((state) => state.auth.isLogIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = localStorage.getItem('name');

    // Redirect to Login page
    function redirectToLogin() {
        navigate("/");
    }

    // Redirect to Create Image page
    function redirectToCreatePage() {
        navigate("landingpage");
    }

    // Redirect to Home page
    function redirectToHome() {
        navigate("home");
    }

    // Logout function
    function userLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="main-nav">
            <div className="heading-left">
                <ShutterSpeedIcon style={{ color: 'skyblue' }} />
                <span onClick={redirectToHome}> ShubhamAI </span>
                <span>-</span>
                <span onClick={redirectToHome}>Image Creator</span>
            </div>

            {
                user ? (
                    <div className="navUser">
                         {name && `Welcome: ${name}`}   
                         {name && <button className="navCTA" onClick={redirectToCreatePage}>Create Image</button>}
                        
                        <button className="navCTA" onClick={userLogout}>LogOut</button>
                    </div>
                ) : (
                    <div className="navButtonHed">
                        <button className="navCTA" onClick={redirectToLogin}>Create Image</button>
                        <button className="navCTA" onClick={redirectToLogin}>Sign In</button>
                    </div>
                )
            }
        </div>
    );
};

export default Nav;
