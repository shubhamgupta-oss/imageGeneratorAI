import React, { useState, useEffect } from "react";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useLocation, useNavigate } from "react-router-dom";
import './ImgView.css';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { ClipLoader } from 'react-spinners';

const ImgView = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const [data, setData] = useState(null);  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(login(token));
        } else {
            navigate("/");
        }
    }, [dispatch, navigate]);

    const location = useLocation();
    const { id } = location.state || {};

    useEffect(() => {
        if (!id) return navigate("/");

        const fetchImage = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/imagesID`, {
                    params: { id }
                });
                const imageData = response.data.data;
                const userid = imageData.user;
                const findUserResponse = await axios.get(`${apiUrl}/api/getUser`, {
                    params: { userid }
                });
                const user = findUserResponse.data;
                setData({
                    image: imageData,
                    user: user
                });


            } catch (error) {
                console.error("Error fetching image or user:", error);
            }
        };
        fetchImage();
        console.log(data);
    }, [id, navigate, apiUrl]);

    const handleDownload = () => {
        if (data && data.image) {
            const link = document.createElement('a');
            link.href = data.image.images;  
            link.download = data.image.title ? `${data.image.title}.png` : 'download.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleShare = () => {
        if (data && data.image) {
            navigator.clipboard.writeText(data.image.images).then(() => {
                alert("URL copied to clipboard!");
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        }
    };

    if (!data) {
        return (
            <div className="loadingText">
                <ClipLoader color="white" loading={true} size={50} />
            </div>
        );
    }

    return (
        <div className="mainImgView">
            <div className="imgSide">
                <img src={data.image.images} alt={data.image.title} />
            </div>
            <div className="ImgDetails">
                <h1>{data.image.title}</h1>
                <div className="inerImgInfo">
                    
                    <span>{data.image.description || "Unknown"}</span> |
                    <span> {data.user.user.name || "N/A"}</span> |
                    <span> Rating : {data.image.Rating || "N/A"}</span>
                </div>
                <div className="divButton">
                    <button onClick={handleShare}><IosShareIcon /> Share</button>
                    <button onClick={handleDownload}><SystemUpdateAltIcon /> Download</button>
                </div>
                <hr />
                <div>
                    Generated with AI at∙ {data.image.createdAt || "Date not available"}
                </div>
            </div>
        </div>
    );
};

export default ImgView;
