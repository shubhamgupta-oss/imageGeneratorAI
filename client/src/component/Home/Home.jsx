import React, { useState } from "react";
import './Home.css';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HomeBody from "../HomeBody/HomeBody";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice'; 
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Home = () => {

    const [queries, setQueries] = useState("");
    const [loading, setloading] = useState("");
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

    async function handleSubmit() {
        const response = await axios.get("", queries);        
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
                placeholder="What do you think I should look for? Let me know, and I'll search for it here." 
            />
            <button className="homeSearchB" onClick={handleSubmit}> 
                <TravelExploreIcon /> Find
            </button>
        </div>
            
            : ""}
           
            <HomeBody/>
        </div>
    );
}

export default Home;
