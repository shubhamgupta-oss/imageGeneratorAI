import React from "react";
import './LatestGenrated.css';
import ImgCard from "../ImgCard/ImgCard";
import { Link } from "react-router-dom";

const data = [
    {prompt: "This photo is by Shubham's work This photo is by Shubham's work This photo is by Shubham's work", imgUrl: "https://as1.ftcdn.net/v2/jpg/05/60/45/26/1000_F_560452626_zr5ZPcwy6dg9RyZCh659lZs9SmVwpr12.jpg"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://as1.ftcdn.net/v2/jpg/05/63/55/54/1000_F_563555473_H3DAtGUE67nPQt8VPfCfoZL00Wd2gLUs.jpg"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://images.nightcafe.studio/jobs/s5l5LEMRZ1c1ay8HQMzu/s5l5LEMRZ1c1ay8HQMzu--3--5OY76_2x_2x.jpg?tr=w-1600,c-at_max"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://media.datadriveninvestor.com/uploads/2019/11/Depositphotos_182959808_s-2019-e1574069070545.jpg"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://cdn.prod.website-files.com/61845f7929f5aa517ebab941/6440f9477c2a321f0dd6ab61_How%20Artificial%20Intelligence%20(AI)%20Is%20Used%20In%20Biometrics.jpg"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://i.pinimg.com/736x/ac/d9/5c/acd95c8af6f06396ea28d81d276e42a7.jpg"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://cdn.prod.website-files.com/61845f7929f5aa517ebab941/6440f9477c2a321f0dd6ab61_How%20Artificial%20Intelligence%20(AI)%20Is%20Used%20In%20Biometrics.jpg"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://images.nightcafe.studio/jobs/Mlax7yjl9Yngc7UtfHb2/Mlax7yjl9Yngc7UtfHb2--4--goqun_2x.jpg?tr=w-1600,c-at_max"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://cdn.prod.website-files.com/61845f7929f5aa517ebab941/6440f9477c2a321f0dd6ab61_How%20Artificial%20Intelligence%20(AI)%20Is%20Used%20In%20Biometrics.jpg"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202407/human-ai-love-063116931-1x1.png?VersionId=Qnj5lxbW92TafoBpvcO24wRSY9f7FShS"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://static1.squarespace.com/static/62ec2bc76a27db7b37a2b32f/t/65fd94ebc4d3d6604d211cfd/1711117547724/ai-love.jpg?format=1500w"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://static1.squarespace.com/static/62ec2bc76a27db7b37a2b32f/t/65fd94ebc4d3d6604d211cfd/1711117547724/ai-love.jpg?format=1500w"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://cdn.pixabay.com/photo/2024/01/05/07/13/ai-generated-8488966_1280.png"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://cdn.pixabay.com/photo/2024/01/05/07/13/ai-generated-8488966_1280.png"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://cdn.pixabay.com/photo/2024/01/05/07/13/ai-generated-8488966_1280.png"},
    {prompt: "This photo is by Shubham's work", imgUrl: "https://cdn.pixabay.com/photo/2024/01/05/07/13/ai-generated-8488966_1280.png"},
];


const LatestGenerated = () => {
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

export default LatestGenerated;