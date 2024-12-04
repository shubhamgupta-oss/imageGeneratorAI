import React, { useState, useEffect } from "react";
import './LandingBody.css';
// import '../DescribeCTA/DescribeCTA.css'
import DisplayImage from "../DisplayImage/DisplayImage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const LandingBody = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [box, setBox] = useState(false);
    const [showImag, setShowImag] = useState(true);
    const [image, setImage] = useState("");
    const [rating, setRating] = useState(0); 
    const [hover, setHover] = useState(0);  
    const [isChecked, setIsChecked] = useState(false);
    const [selectedCelebrity, setSelectedCelebrity] = useState("");
    const [selectedOther, setSelectedOther] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
        setSelectedCelebrity("");
        setSelectedOther(""); 
    };

    const handleCelebrityChange = (e) => {
        const value = e.target.value;
        setSelectedCelebrity(value);
        if (value !== "Other") {
            setSelectedOther(""); 
        }
    };

    const handleOtherInputChange = (e) => {
        setSelectedOther(e.target.value);
    };

    const handleStarClick = (index) => {
        setRating(index);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    async function handleImageGeneration() {
        if (!description) return toast.error("Your Description Box is empty");

        const finalCelebrity =
            selectedCelebrity === "Other" ? selectedOther.trim() : selectedCelebrity;

        if (selectedCelebrity === "Other" && !selectedOther.trim()) {
            return toast.error("Please enter a valid celebrity name");
        }

        setBox(true);
        setLoading(true);

        try {
            const response = await axios.post(`${apiUrl}/api/generateImage`, { 
                description, 
                selectedCelebrity: finalCelebrity 
            });

            if (response.data.image) {
                setImage(response.data.image);
            }
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error("Something went wrong! Please try again.");
            setBox(false);
            setRating(0);
        } finally {
            setLoading(false);
            setIsChecked(false);
        }
    }

    const handleSaveImage = async () => {
        if (title.length < 10) return toast.error("Please add a title with at least 10 characters");

        setLoading(true);

        const token = localStorage.getItem('token');
        const sendImage = `data:image/jpeg;base64,${image}`;

        const data = {
            Rating: rating,
            description,
            title,
            image: sendImage,
        };

        try {
            await axios.post(`${apiUrl}/api/postimage`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Your image is successfully stored");
            setRating(0);
            setDescription("");
            setBox(false);
            setTitle("");
            setSelectedCelebrity("");
            setSelectedOther(""); // Clear the custom input
            setIsChecked(false);
        } catch (error) {
            toast.error("Error saving image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        toast.error("You lost your image");
        setBox(false);
        setRating(0);
        setDescription("");
        setSelectedCelebrity("");
        setSelectedOther(""); // Clear custom input
    };

    useEffect(() => {
        setShowImag(true);
    }, [image]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(login(token));
        } else {
            navigate("/");
        }
    }, [dispatch, navigate]);

    return (
        <div className="main-LandingBody">
            <div className="firstpart">
                <h1>Create images from words with AI</h1>
                <div className="DescribeCTA">
                    <textarea 
                        className="DescribeText"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Describe what you would like to create"
                    />
                </div>

                <div className="options">
                    <div>
                        <input
                            type="checkbox"
                            id="celebrityCheckbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="celebrityCheckbox">
                            If you want to create an image inspired by your favorite celebrity with your own text, choose me!
                        </label>
                    </div>

                    {isChecked && (
                        <div>
                            <select
                                value={selectedCelebrity}
                                onChange={handleCelebrityChange}
                                className="dropdown"
                            >
                                <option value="">Select a celebrity</option>
                                <option value="Amitabh Bachchan">Amitabh Bachchan</option>
                                <option value="Shah Rukh Khan">Shah Rukh Khan</option>
                                <option value="Priyanka Chopra">Priyanka Chopra</option>
                                <option value="Salman Khan">Salman Khan</option>
                                <option value="Deepika Padukone">Deepika Padukone</option>
                                <option value="Other">Other</option>
                            </select>
                            {selectedCelebrity === "Other" && (
                                <input
                                    type="text"
                                    placeholder="Enter celebrity name"
                                    value={selectedOther}
                                    onChange={handleOtherInputChange}
                                    className="customInput"
                                />
                            )}
                        </div>
                    )}
                </div>

                <button onClick={handleImageGeneration} className="btn-dec">Click me and get</button>
                <h5>Image Creator helps you generate images based on your words with AI.</h5>
            </div>
            {box && (
                <div className="genratingImage">
                    {loading ? (
                        <div className="loadingText">
                            <ClipLoader color="white" loading={loading} size={50} />
                        </div>
                    ) : (
                        showImag && (
                            <div className="genratedBox">
                                <img className="imagcls" src={`data:image/jpeg;base64,${image}`} alt="Generated" />
                                <div className="contentbut">
                                    <input 
                                        type="text"
                                        onChange={handleTitleChange}
                                        maxLength={100}
                                        className="inputBoxTitle"
                                        value={title}
                                        placeholder="Set Name for this image"
                                    />
                                    <label>Rate the image in 1-5</label>
                                    <div className="StarDiv">
                                        {[...Array(5)].map((_, index) => (
                                            <a
                                                key={index}
                                                className={rating > index || hover > index ? "colored" : ""}
                                                onMouseEnter={() => setHover(index + 1)}
                                                onMouseLeave={() => setHover(0)}
                                                onClick={() => handleStarClick(index + 1)}
                                            >
                                                ★
                                            </a>
                                        ))}
                                    </div>
                                    <button className="btn-pop" onClick={handleSaveImage}>Store Image</button>
                                    <button className="btn-pop" onClick={handleClose}>Close</button>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
            <DisplayImage />
        </div>
    );
};

export default LandingBody;
