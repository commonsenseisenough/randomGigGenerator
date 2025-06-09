import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

export const useGif = (tag) => {
    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState(false); 

    async function fetchData(tag) {
        setLoading(true);
        try {
            const { data } = await axios.get(tag ? `${url}&tag=${tag}` : url);
            const imageSrc = data.data.images.downsized_large.url;
            setGif(imageSrc);
        } catch (error) {
            console.error("Error fetching gif:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData(tag); 
    }, [tag]);

    return { gif, loading, fetchData };
};
