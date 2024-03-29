import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Layout from "./layout/Layout.jsx"
import Home from "./pages/Home.jsx"
import Explore from "./pages/Explore.jsx"
import "./index.css"

const router = createBrowserRouter([{
  path:"/",
  element:<Layout/>,
  children:[
    {
      index:true,
      element:<Home/>
    },
    {
      path:"explore",
      element:<Explore/>
    },
  ]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

