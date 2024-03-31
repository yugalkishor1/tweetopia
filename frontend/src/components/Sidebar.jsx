import React, { useEffect, useState } from 'react'
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoMdMan } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";

function Sidebar({className}) {
    const [isSmallScreen ,setIsSmallScreen] = useState(true)

    useEffect(()=>{
      const handleResize = () => {
          setIsSmallScreen(window.innerWidth > 768 )
      }

      window.addEventListener("resize", handleResize)
      handleResize()

      return () => window.removeEventListener("resize" , handleResize)
    },[])

    return (
        <div className={`${className} flex flex-col `}>
          <div className="p-4 hover:bg-gray-200 rounded-full flex gap-4">
            <FaHome className="text-2xl text-gray-600" />
            {isSmallScreen && <p>HOME</p>}
          </div>
          <div className="p-4 hover:bg-gray-200 rounded-full flex gap-4">
            <FaSearch className="text-2xl text-gray-600" />
            {isSmallScreen && <p>SEARCH</p>}  
          </div>
          <div className="p-4 hover:bg-gray-200 rounded-full flex gap-4">
            <FaMessage className="text-2xl text-gray-600" />
            {isSmallScreen && <p>MESSAGE</p>}
          </div>
          <div className="p-4 hover:bg-gray-200 rounded-full flex gap-4">
            <IoMdMan className="text-2xl text-gray-600" />
            {isSmallScreen && <p> PROFILE</p>}
          </div>
          <div className="p-4 hover:bg-gray-200 rounded-full flex gap-4">
            <FaBookmark className="text-2xl text-gray-600" />
            {isSmallScreen && <p>BOOKMARK</p>}
          </div>
        </div>
      )
}

export default Sidebar