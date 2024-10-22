import React from "react";
import './Nav.css';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';


const Nav = () => {
    let user = useSelector((state) => state.auth.isLogIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function redirecttoLogin(){
        navigate("/")
    }

    
    function redirecttoCreatepage(){
        navigate("landingpage")
    }
    function redirecttohome(){
        navigate("home")
    }
    function userlogut() {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="main-nav">
            <div className="heading-left">
                <ShutterSpeedIcon style={{ color: 'skyblue' }} />
                <span onClick={redirecttohome} > ShubhamAI </span>
                <span>-</span>
                <span onClick={redirecttohome} >Image Creator</span>
            </div>

            {
                user ? (
                    <div className="navUser">
                        <button className="navCTA" onClick={redirecttoCreatepage}>Create Image</button>
                        <button className="navCTA" onClick={userlogut}>LogOut</button>
                       
                    </div>
                ) : (
                    <div className="navButtonHed">
                        <button className="navCTA"onClick={redirecttoLogin} >Create Image</button>
                        <button className="navCTA" onClick={redirecttoLogin}>Sign In</button>
                    </div>
                )
            }
        </div>
    );
};

export default Nav;
