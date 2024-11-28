import '../LatestGenrated/LatestGenrated.css';
import { React, useEffect, useState } from "react";
import ImgCard from "../ImgCard/ImgCard";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify'; 

const LatestGenerated = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/api/allImages`);

        if (response.data.data.length === 0) {
          toast.info("No images available to display");
        }

        setData(response.data.data);

        setLoading(false);
      } catch (error) {
        setError("Error fetching images. Please try again later.");
        setLoading(false);
        console.error("Error fetching images:", error);
        toast.error("Error fetching images. Please try again later.");
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="loadingText">
        <ClipLoader color="white" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>; 
  }

  return (
    <div className="mainLatest">
      <div className="img-grid">
        {data.length > 0 ? (
          data.map((item, index) => (
            <Link
              to={{
                pathname: "/image",
              }}
              key={index}
              state={{ id: item._id }}
            >
              <ImgCard prompt={item.title} imgUrl={item.images} Rating={item.Rating} />
            </Link>
          ))
        ) : (
          <div>No images available</div> 
        )}
      </div>
    </div>
  );
};

export default LatestGenerated;
