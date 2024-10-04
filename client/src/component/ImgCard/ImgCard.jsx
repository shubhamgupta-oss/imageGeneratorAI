import React from "react";
import './ImgCard.css';

const ImgCard = ({ prompt, imgUrl }) => {
    return (
        <div className="img-card">
            <img className="img-img" src={imgUrl} alt={prompt} />
            <div className="img-prompt">
                <p>{prompt}</p>
            </div>
        </div>
    );
};

export default ImgCard;
