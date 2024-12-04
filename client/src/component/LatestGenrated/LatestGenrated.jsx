import '../LatestGenrated/LatestGenrated.css';
import React, { useEffect, useState } from "react";
import ImgCard from "../ImgCard/ImgCard";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const LatestGenerated = () => {
  const [data, setData] = useState([]); // Store loaded images
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [page, setPage] = useState(1); // Current page for API
  const [hasMore, setHasMore] = useState(true); // Whether there are more images to fetch
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";

  // Fetch images function
  const fetchImages = async () => {
    if (!hasMore || loading) return; // Stop if already loading or no more data

    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/allImages`, {
        params: { page, limit: 10 }, // Pass page and limit
      });

      const newImages = response.data.data;
      const totalPages = response.data.totalPages;

      setData(prev => [...prev, ...newImages]); // Append new images to existing data

      if (page >= totalPages || newImages.length === 0) {
        setHasMore(false); // Stop further requests when no more data
        toast.info("All images loaded");
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Error fetching images. Please try again later.");
      toast.error("Error fetching images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Load images when page changes
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Run only when the `page` changes

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading) return;

      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setPage(prev => prev + 1); // Increment page number when near bottom
      }
    };

    if (hasMore) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll); // Cleanup listener when no more data
    }

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, [hasMore, loading]); // Dependency array ensures this effect runs when `hasMore` or `loading` changes

  if (loading && data.length === 0) {
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
      {loading && <div className="loadingText"><ClipLoader color="white" size={30} /></div>}
      {!hasMore && <div className="end-message">No more images to display</div>} {/* End message */}
    </div>
  );
};

export default LatestGenerated;
