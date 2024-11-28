import '../LatestGenrated/LatestGenrated.css';
import { React, useEffect, useState } from "react";
import ImgCard from "../ImgCard/ImgCard";
import { Link } from "react-router-dom";
import axios from 'axios';

const LatestGenerated = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchImages = async () => {

        const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/userimages`,
            {
                headers: { Authorization: `Bearer ${token}` } 
            }

        );
        const limitedImages = response.data.data;
        setData(limitedImages);
        setLoading(false); 
      } catch (error) {
        setError(error);  
        setLoading(false);  
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching images. Please try again later.</div>;
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
              state={{ prompt: item.title, imgUrl: item.images }}
            >
              <ImgCard prompt={item.title} imgUrl={item.images} />
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
