import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Recommendation from '../components/Recommendation.jsx'

function Layout() {
  return (

    <div className="p-4 flex h-screen bg-white sm:p-8">
        <Sidebar className="lg:w-1/4  bg-white border-r border-gray-300"/>
        <div className="lg:w-1/2 border-r border-gray-300 flex flex-col">
            <div className="flex-grow overflow-y-auto ">
                <Outlet/>
            </div>
        </div>
        <Recommendation className="lg:w-1/4 bg-white hidden lg:block"/>
    </div>

  )
}

export default Layout