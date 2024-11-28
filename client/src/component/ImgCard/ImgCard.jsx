import React from "react";
import './ImgCard.css';

const ImgCard = ({ prompt, imgUrl, Rating }) => {
    return (
        <div className="img-card">
            <img className="img-img" src={imgUrl} alt={prompt} />
            <div className="img-prompt">
                <span>{prompt}</span> <br />
                <span>The Image is Rated By Creater is: {Rating}</span>
            </div>
        </div>
    );
};

export default ImgCard;
