import React from "react";
import './Auth.css'
import AuthForm from "./AuthForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Auth = () =>{


    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/home")
        }
      }, [dispatch]);

       


    return(
       <div className="mainAuth">
        <AuthForm/>

       </div>
    )
}

export default Auth;