import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

export const useGif = (tag) => {
  const [gif, setGif] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchData() {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get(tag ? `${url}&tag=${tag}` : url);
      const imageSrc = data.data.images.downsized_large.url;
      setGif(imageSrc);
    } catch (err) {
      if (err.response?.status === 429) {
        setError("API free trial limit has been reached. Try again later.");
      } else {
        setError("Failed to fetch GIF. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { gif, loading, fetchData, error };
};
