import React, { useEffect, useState } from "react";
import axios from "axios";
import './DisplayImage.css'

const DisplayImage = () => {
  const [data, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/allImages`);
        const limitedImages = response.data.data.slice(0, 4); 
        setData(limitedImages);
        console.log(limitedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="secondPart">
      <div className="imageContainer">
        {data[0] && (
          <div className="displayWork">
            <img src={data[0].images} alt={`Image 1`} />
            <div className="hoverContent">{data[0].title}</div>
          </div>
        )}

        {data[1] && (
          <div className="displayWork">
            <img src={data[1].images} alt={`Image 2`} />
            <div className="hoverContent">{data[1].title}</div>
          </div>
        )}
      </div>

      <div className="imageContainer">
        {data[2] && (
          <div className="displayWork">
            <img src={data[2].images} alt={`Image 3`} />
            <div className="hoverContent">{data[2].title}</div>
          </div>
        )}

        {data[3] && (
          <div className="displayWork">
            <img src={data[3].images} alt={`Image 4`} />
            <div className="hoverContent">{data[3].title}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayImage;
