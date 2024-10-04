import React from "react";
import '../LatestGenrated/LatestGenrated.css';
import ImgCard from "../ImgCard/ImgCard";
import { Link } from "react-router-dom";


const data = [
    { prompt: "This photo is by Shubham's work", imgUrl: "https://cdn.prod.website-files.com/61845f7929f5aa517ebab941/6440f9477c2a321f0dd6ab61_How%20Artificial%20Intelligence%20(AI)%20Is%20Used%20In%20Biometrics.jpg" },
    { prompt: "Another view of AI usage", imgUrl: "https://images.nightcafe.studio/jobs/Mlax7yjl9Yngc7UtfHb2/Mlax7yjl9Yngc7UtfHb2--4--goqun_2x.jpg?tr=w-1600,c-at_max" },
    { prompt: "Exploring human-AI interactions", imgUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202407/human-ai-love-063116931-1x1.png?VersionId=Qnj5lxbW92TafoBpvcO24wRSY9f7FShS" },
    { prompt: "AI in art", imgUrl: "https://static1.squarespace.com/static/62ec2bc76a27db7b37a2b32f/t/65fd94ebc4d3d6604d211cfd/1711117547724/ai-love.jpg?format=1500w" },
    { prompt: "Generated AI art", imgUrl: "https://cdn.pixabay.com/photo/2024/01/05/07/13/ai-generated-8488966_1280.png" },
];

const YourWork = () => {
    return (
        <div className="mainLatest">
            <div className="img-grid">
                {data.map((item, index) => (
                    <Link 
                        to={{
                            pathname: "/image", 
                        }} 
                        key={index}
                        state={{ prompt: item.prompt, imgUrl: item.imgUrl }}
                    >
                        <ImgCard prompt={item.prompt} imgUrl={item.imgUrl} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default YourWork;
