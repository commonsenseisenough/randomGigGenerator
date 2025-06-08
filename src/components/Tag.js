import React, { useState, useEffect } from 'react';
import { Spinner } from './Spinner';
import { useGif } from '../hooks/useGif';

export const Tag = () => {
  const [tag, setTag] = useState('car');

  // useGif returns fetchData, so you need this hook call before useEffect
  const { gif, loading, fetchData } = useGif(tag);

  // Call fetchData when tag changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function changeHandler(event) {
    setTag(event.target.value);
  }

  return (
    <div className='w-1/2 bg-red-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
      <h1 className='mt-[15px] text-2xl underline uppercase font-bold'>
        Random {tag} GIF
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        <img src={gif} alt={`Gif with tag: ${tag}`} width="450" />
      )}

      <input
        className='w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center'
        onChange={changeHandler}
        value={tag}
      />

      <button
        onClick={() => fetchData(tag)}
        className='w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px]'
      >
        Generate
      </button>
    </div>
  );
};
