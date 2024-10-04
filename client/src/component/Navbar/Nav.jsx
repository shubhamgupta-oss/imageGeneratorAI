import React from "react";
import './Nav.css'
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';

const Nav = () => {

    let user = true;
    return (
        <div className="main-nav">
    <div className="heading-left"> 
     <ShutterSpeedIcon style={{ color: 'skyblue' }} />
        <span> ShubhamAI </span>
        <span>-</span>
        <span>Image Creator</span>
    </div>

{
    user && (
        <div className="navUser">
        <span>Neil</span>
        <div className="LogedUSer">N</div>
    </div>
    )
}
   
</div>

    );
}

export default Nav;
