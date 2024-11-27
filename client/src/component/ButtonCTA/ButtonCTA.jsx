import React from "react";
import './Button.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ButtonCTA = (props) => {


    return (
        <button onClick={()=>console.log(props)}  type="button" className="cta-button">
        
        <AutoAwesomeIcon/>{props.value}
        </button>
    );
}

export default ButtonCTA;
