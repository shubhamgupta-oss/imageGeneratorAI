import React, { useState } from "react";
import './HomeBody.css'
import LatestGenrated from "../LatestGenrated/LatestGenrated";
import YourWork from "../YourWork/YourWork";
const HomeBody = () =>{
    const [activeTab, setActiveTab] = useState("latestGenerated");

    function handelTabClick(tabname){
        setActiveTab(tabname);

    }

    return(
        <>
         <div className="homeBodyMain">
            <div className="bodydiv">
            <span className={`forHover ${activeTab ==="latestGenerated" ? "active" : ""}`} onClick={ () => handelTabClick("latestGenerated")} >Latest Genrated</span>
            <span className={`forHover ${activeTab ==="yourwork" ? "active" : ""}`} onClick={() => handelTabClick("yourwork")} >Your Work</span>

            </div>
            <div className="bodydiv">
            <span className="forHover">Help</span>
            </div>
        </div>

        <div className="tabCont">
            {activeTab === "latestGenerated" && <LatestGenrated/>} 
            {activeTab === "yourwork" &&  <YourWork/> }
        </div>
        
        
       
        </>
      
       
    )
}

export default HomeBody;