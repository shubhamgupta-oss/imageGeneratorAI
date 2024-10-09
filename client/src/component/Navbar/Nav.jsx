import React from "react";
import './Nav.css';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';

const Nav = () => {
    let user = false;

    return (
        <div className="main-nav">
            <div className="heading-left">
                <ShutterSpeedIcon style={{ color: 'skyblue' }} />
                <span> ShubhamAI </span>
                <span>-</span>
                <span>Image Creator</span>
            </div>

            {
                user ? (
                    <div className="navUser">
                        <span>Neil</span>
                        <div className="LogedUser">N</div>
                    </div>
                ) : (
                    <div className="navButtonHed">
                        <button className="navCTA">Create Image</button>
                        <button className="navCTA">Sign In</button>
                    </div>
                )
            }
        </div>
    );
};

export default Nav;
