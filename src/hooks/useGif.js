import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const API_KEY=process.env.REACT_APP_GIPHY_API_KEY;
const url=`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;


export const useGif = (tag) => {
    
    const [gif,setGif]=useState('');
    const [loading,setLoading]=useState('false');

    async function fetchData(tag) {
        setLoading(true)
        
        // const output=await axios.get(url);
        const {data}= await axios.get(tag ? `${url}&tag=${tag}` :url);
        // console.log(output)
        const imageSrc=data.data.images.downsized_large.url;
        // console.log(imageSrc)
        setGif(imageSrc);
        setLoading(false);


    }

    useEffect(()=>{
        fetchData();
    },[])

    return {gif,loading,fetchData}
    
}
