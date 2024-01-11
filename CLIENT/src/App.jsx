// import { useState } from 'react'
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import './App.scss'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Single from "./Pages/Single";
import Register from "./Pages/Register";
import Write from "./Pages/Write";
import Login from "./Pages/Login";


const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>

      },
      {
        path:"/post/:id",
        element:<Single/>

      },
      {
        path:"/write",
        element:<Write/>

      },

    ]
  },
  
  {
    path: "/Register",
    element: <Register/>,
  },
  
  {
    path: "/Login",
    element: <Login/>,
  },
  
]);

function App() {

  return (
    <div className="app">
        <div className="container">
          <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
