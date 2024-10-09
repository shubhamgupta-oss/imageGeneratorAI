import React from "react";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useLocation } from "react-router-dom";
import './ImgView.css';

const ImgView = () => {
    const location = useLocation();
    const { prompt, imgUrl } = location.state || {};

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imgUrl; 
        link.download = prompt ? `${prompt}.png` : 'download.png'; 
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link); 
    };

    const handleShare = () => {
        navigator.clipboard.writeText(imgUrl).then(() => {
            alert("URL copied to clipboard!");
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
       
    };

    return (
        <div className="mainImgView">
            <div className="imgSide">
                <img src={imgUrl} alt={prompt} />
            </div>
            <div className="ImgDetails">
                <h1>{prompt}</h1>
                <div className="inerImgInfo">
                    <span>username </span> |
                    <span> duration </span> |
                    <span> size</span>
                </div>
                <div className="divButton">
                    <button onClick={handleShare}><IosShareIcon /> Share</button>
                    <button onClick={handleDownload}><SystemUpdateAltIcon /> Download</button>
                </div>
                <hr />
                <div>
                    Generated with AI ∙ May 31, 2024 at 7:57 PM
                </div>
            </div>
        </div>
    );
};

export default ImgView;
