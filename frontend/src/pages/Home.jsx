import React from 'react'
import TweetInput from '../components/TweetInput.jsx'
import Tweets from "../components/Tweets.jsx"


function Home() {
    return (
        <div className='text-center p-8'>
            <TweetInput/>
            <Tweets/>
        </div>


)
}

export default Home