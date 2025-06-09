import React from 'react';
import { Spinner } from './Spinner';
import { useGif } from '../hooks/useGif';

export const Random = () => {
  const { gif, loading, fetchData, error } = useGif();

  return (
    <div className='w-1/2 bg-green-500 rounded-lg border border-black
                    flex flex-col items-center gap-y-5 mt-[15px] p-4'>
      <h1 className='text-2xl underline uppercase font-bold'>
        A Random GIF
      </h1>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-white bg-red-600 px-4 py-2 rounded">
          {error}
        </p>
      ) : (
        <img src={gif} alt="Random Gif" width="450" />
      )}

      <button
        onClick={fetchData}
        className='w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px]'
      >
        Generate
      </button>
    </div>
  );
};
