import React, { useState } from "react";
import './LandingBody.css';
import '../DescribeCTA/DescribeCTA.css'
import DisplayImage from "../DisplayImage/DisplayImage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import {toast} from 'react-toastify'
import { ClipLoader } from 'react-spinners';
import axios from 'axios';


const LandingBody = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

    const [description, setdescription] = useState("");
    const [loading, setloading] = useState(false);
    const [title, setTitle] = useState("")
    const [box, setBox] = useState(false);
    const [showImag, SetShowImag]= useState(true);
    const [image, setImag] = useState("");
    const arr = new Array(5).fill(0);
    const [rating, setRating] = useState(0); 
    const [hover, setHover] = useState(0);  
    const [isChecked, setIsChecked] = useState(false);
    const [selectedCelebrity, setSelectedCelebrity] = useState("");
    const [selectedOther, setselectedOther] = useState("");
    


    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
        setSelectedCelebrity("");
    };

    const handleCelebrityChange = (e) => {
        const value = e.target.value;
        setSelectedCelebrity(value);
        if(selectedCelebrity === "Other"){
            setSelectedCelebrity(selectedOther);
        }
        
    };


    const handleStarClick = (index) => {
      setRating(index);
    };
  

    const dispatch = useDispatch();
    const navigate = useNavigate()

    function adddescription(e){
        const  {value}  = e.target;
        setdescription(value);
    }
    function setTitleValue(e){
        const  {value}  = e.target;
        setTitle(value);
    }
    async function handelImageGenration() {
        if (!description) return toast.error("Your Description Box is empty");
        
        setBox(true);
        setloading(true);
        
    
        try {
            const response = await axios.post(`${apiUrl}/api/generateImage`, { description, selectedCelebrity });
            console.log(response.data); 
    
          
            if (response.data.image) {
                // const completeImg = `data:image/jpeg;base64,${response.data.image}`;
                setImag(response.data.image);
            }
            
    
        } catch (error) {
            console.error("Error generating image:", error);
            setBox(false)
            setRating(0);
            toast.error("Something went wrong! Please Try Again"); 
        } finally {
            setloading(false);
            setIsChecked(false);

             
        }
    }

    function handelClose(){
        toast.error("You lost your image")
        setBox(false)
        setRating(0);
        setdescription(""); 
        setSelectedCelebrity("");
    }

    const handeSaveImage = async () =>{
        if(title.length < 10 ) return toast.error("Please add The title name Min 10 Char"); 

        setloading(true);

        const token = localStorage.getItem('token')

        const sendimage= `data:image/jpeg;base64,${image}`

        const data = {
            Rating: rating,
            description:description,
            title,
            image:sendimage,           
        };
        
        const storeImg = await axios.post(
            `${apiUrl}/api/postimage`,
            data,
            {
                headers: { Authorization: `Bearer ${token}` } 
            }
        );

        toast.success("Your image is succesfully stored");
        setRating(0);
        setdescription(""); 
        setBox(false);
        setTitle("");
        setSelectedCelebrity("");
        setIsChecked(false)
        setloading(false);
        

            
    }
    useEffect(()=>{
        SetShowImag(true)
    },[image])
    
    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (token) {
          dispatch(login(token));
        }
        else{
            navigate("/")
        }
      }, [dispatch]);

    return (
        <div className="main-LandingBody">
            <div className="firstpart">
                <h1>Create images from words with AI</h1>
                <div className="DescribeCTA">
                <textarea className="DescribeText"
                 value={description} 
                 onChange={adddescription} name="" id="" placeholder="Describe what do you like Create" />
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
                    If you want to create an image inspired by your favorite celebrity with
                    your own text, choose me!
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
                        onChange={(e) => setselectedOther(e.target.value)}
                        className="customInput"
                        />
                    )}
                    </div>
                )}
                </div>



                <button onClick={handelImageGenration} className="btn-dec">Click me and get</button>
                <h5>Image Creator helps you generate images based on your words with AI.</h5>
            </div>
            {
                box &&
                <div className="genratingImage">
                    {loading? 

                    <>
                     <div className="loadingText">
                     <ClipLoader color="white" loading={loading} size={50} />
                     </div>
                    </>
                    
                    :
                    showImag && 

                    <div className="genratedBox">
                        <div>
                        <img className="imagcls" src={`data:image/jpeg;base64,${image}`} alt="Genrted" />
                        </div>
                        
                         <div className="contentbut">
                            <input type="text" onChange={setTitleValue} maxLength={100} className="inputBoxTitle" value={title} placeholder="Set Name for this image"/>
                            <label htmlFor="">Rate the image in 1-5</label>
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
                            <button className="btn-pop" onClick={handeSaveImage}>Store Image</button>
                            <button className="btn-pop" onClick={handelClose}>Close</button>
                         </div>
                        
                        

                    </div>
                   
                    }
                
                </div>
            }
           

            <DisplayImage/>

        </div>
    );
}

export default LandingBody;

