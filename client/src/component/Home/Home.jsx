import React, { useState } from "react";
import './Home.css';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HomeBody from "../HomeBody/HomeBody";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice'; 
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [queries, setQueries] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    

    useEffect(() => {
      
        if (token) {
          dispatch(login(token));
        }
        
      }, [dispatch]);



    function handleQueries(e) {  
        const { value } = e.target;
        setQueries(value);
    }

    function handleSubmit() {
        console.log("Submitted query:", queries);
        setQueries("")
    }

    return (
        <div className="mainHome">
            {token 
            
            ? 
            <div className="inputDiv">
            <input 
                type="text" 
                value={queries}
                onChange={handleQueries}  
                placeholder="Write what's on your mind..." 
            />
            <button className="homeSearchB" onClick={handleSubmit}> 
                <TravelExploreIcon /> Create
            </button>
        </div>
            
            : ""}
           
            <HomeBody/>
        </div>
    );
}

export default Home;
