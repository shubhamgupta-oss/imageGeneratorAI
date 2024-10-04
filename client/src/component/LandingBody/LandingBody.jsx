import React from "react";
import './LandingBody.css';
// import ButtonCTA from "../ButtonCTA/ButtonCTA.jsx";
import DescribeCTA from "../DescribeCTA/DescribeCTA";
import ButtonCTA from "../ButtonCTA/ButtonCTA";
import DisplayImage from "../DisplayImage/DisplayImage";

const LandingBody = () => {
    return (
        <div className="main-LandingBody">
            <div className="firstpart">
                <h1>Create images from words with AI</h1>
                <DescribeCTA />
                <ButtonCTA value="Join & Create " />
                <h5>Image Creator in Bing helps you generate images based on your words with AI.</h5>
            </div>

            <DisplayImage/>

        </div>
    );
}

export default LandingBody;
