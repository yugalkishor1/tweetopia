import React, { useState, useEffect } from 'react';
import axios from "axios"

const Tweet = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('');
        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }
        const data = await response.json();
        setTweets(data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  // return (
  //   <div>
  //     <h1>Tweets</h1>
  //     <div>
  //       {tweets.map((post) => 
  //         ( 
  //         <div key={ post._id }>
  //           <div>{post}</div>
  //           <div>{ post.text }</div>
  //           <div>{post.images}</div>
  //           <div>

  //           </div>
  //         </div>
  //         ) )}
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex h-full p-4 pl-0 border-b border-gray-500 gap-4">
      <div className="w-10">
        <div className='w-10 h-10 rounded-full bg-green-300'>u</div>
      </div>
      <div className="w-full flex flex-col">
        <div className='text-left'>username </div>
        <div className="h-90 bg-gray-100 text-left ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet accusamus hic sint eaque veritatis, incidunt enim soluta odio labore velit blanditiis animi, neque, quis recusandae? Nesciunt non error totam asperiores aspernatur eaque magni, alias quasi vero voluptates corporis tempore deleniti ad quibusdam culpa illo fugiat quisquam nostrum ut consequuntur. Libero.
        </div>
        <div className="h-10 flex justify-between px-16">
          <button className="px-4 py-2 "> 1</button>
          <button className="px-4 py-2 "> 2</button>
          <button className="px-4 py-2 "> 3</button>
          <button className="px-4 py-2 "> 4</button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
