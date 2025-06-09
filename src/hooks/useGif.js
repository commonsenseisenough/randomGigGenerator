import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

export const useGif = (tag) => {
    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // ✅ for error message

    async function fetchData(tag) {
        setLoading(true);
        setError(null); // reset error before new call

        try {
            const { data } = await axios.get(tag ? `${url}&tag=${tag}` : url);
            const imageSrc = data.data.images.downsized_large.url;
            setGif(imageSrc);
        } catch (err) {
            if (err.response && err.response.status === 429) {
                setError("API free trial limit has been reached. Please try again later.");
            } else {
                setError("Something went wrong. Please try again.");
            }
            console.error("GIF fetch error:", err);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchData(tag);
    }, [tag]);

    return { gif, loading, error, fetchData };
};
