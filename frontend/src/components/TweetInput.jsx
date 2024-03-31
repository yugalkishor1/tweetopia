import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from "axios"
import { MdOutlinePermMedia } from "react-icons/md";

const TweetInput = ({ addTweet }) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);

  const onDrop = useCallback(acceptedFile=>{
    setMedia(perv=>[...perv,acceptedFile])
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*,video/*',
    onDrop,

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new tweet object
    const newTweet = {
      id: Date.now(),
      text,
      media,
      likes: 0,
      comments: [],
      views: 0,
      retweets: 0,
    };

    // Send the new tweet to the server (dummy API)
    const response = await fetch('/api/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTweet),
    });

    if (response.ok) {
      addTweet(newTweet);
      setText('');
      setMedia(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start border-b border-gray-300 p-4">
      <div className="rounded-full h-12 w-12 mr-4 overflow-hidden bg-red-200 ">
        {/* <img src="/user-avatar.png" alt="User Avatar" className="h-full w-full object-cover" /> */}
      </div>
      <div className="flex-1">
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border-none focus:ring-0 text-lg placeholder-gray-500 outline-none"
          rows="2"
        />
        <div className="flex items-center justify-between mt-2">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <button type="button" className="flex items-center text-blue-500 hover:bg-blue-100 rounded-full px-3 py-1 text-sm">
           
            <div className=' flex gap-2'>
            <MdOutlinePermMedia className="text-xl text-gray-600"/>
              Add media
            </div>
            
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full px-4 py-2 font-bold hover:bg-blue-600 transition-colors duration-200"
          >
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetInput;