import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from "@mui/material/Grid"

function Layout() {
  return (
    // <div className="grid grid-cols-12 max-w-[700px] gap-4 mx-auto mt-4">
    //   <div className='col-span-3 bg-green-700 sm:col-span-1 ' >sidebar</div>
    //   <div className='col-span-6 bg-red-700' >
    //    <Outlet/>
    //   </div>
    //   <div className='col-span-3 bg-blue-700 hidden md:block' >Recommondation</div>
    // </div>
   <div className=' grid m-8 gap-4 sm:grid-cols-2 '>
    <div className='bg-red-500 rounded min-h-[50px]'></div>
    <div className='bg-green-500 rounded min-h-[50px]'></div>
   </div>
  )
}

export default Layout