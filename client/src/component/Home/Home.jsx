import React, { useState, useEffect } from "react";
import './Home.css';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HomeBody from "../HomeBody/HomeBody";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice'; 
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import {toast} from 'react-toastify';
// import { ClipLoader } from 'react-spinners';


const Home = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
    const [queries, setQueries] = useState("");
    const [loading, setLoading] = useState(false); 
    const [images, setImages] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const [isCooldown, setIsCooldown] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(login(token));
        }
    }, [dispatch, token]);

    function handleQueries(e) {  
        const { value } = e.target;
        setQueries(value);
    }

    async function handleFinding() {
        if (!queries) {
            toast.error("Please enter a query to find");
            return;
        }
        if (isCooldown) return;
        setIsCooldown(true);
        setLoading(true);

        try {
            const response = await axios.get(`${apiUrl}/api/findimages`, {
                params: { queries } 
            });

            if (response.data.data && response.data.data.length > 0) {
                setImages(response.data.data);
                setShowModal(true); 
            } else {
                toast.info("No images found for your query");
            }

            
        } catch (err) {
            console.error("Error fetching data:", err);
            toast.error("An error occurred while fetching images. Please try again.");
        } finally {
            setLoading(false); 
            setIsCooldown(false);
            setQueries("");
        }
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <div className="mainHome">
            {token && (
                <div className="inputDiv">
                    <input 
                        type="text" 
                        value={queries}
                        onChange={handleQueries}  
                        placeholder="What do you think I should look for? Let me know, and I'll search for it here." 
                    />
                    <button className="homeSearchB" onClick={handleFinding} disabled={loading}> 
                        {isCooldown ? "Wait..." : (<><TravelExploreIcon /> Find</>)}
                    </button>
                </div>
            )}

            {loading && 
                <div className="loadingText">
                    <ClipLoader color="white" loading={loading} size={50} />
                </div>
            }

            <HomeBody />

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={handleCloseModal}>X</button>
                        <h2>Found Images</h2>
                        <div className="image-container">
                            {images.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.images} alt={image.title} />
                                    <p>{image.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
