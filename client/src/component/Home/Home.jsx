import React, { useState } from "react";
import './Home.css';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HomeBody from "../HomeBody/HomeBody";

const Home = () => {
    const [queries, setQueries] = useState("");

    function handleQueries(e) {  
        const { value } = e.target;
        setQueries(value);
        // console.log(value); 
    }

    function handleSubmit() {
        console.log("Submitted query:", queries);
        setQueries("")
    }

    return (
        <div className="mainHome">
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
            <HomeBody />
        </div>
    );
}

export default Home;
