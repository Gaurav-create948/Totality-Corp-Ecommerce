import React, { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from "react-query"
import Home from './Components/Home';
import ProductInfo from './Components/ProductInfo.js';
import UserCart from './Components/UserCart.js';
import Navbar from './Components/Navbar';
import axios from "axios";
import { CircularProgress } from '@mui/material';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';




const App = () => {

  const Layout = () => {
    return (
      <div className='main min-h-screen'>
        <Navbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    )
  }



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: '/product/:_id',
          element: <ProductInfo />
        },
        {
          path: '/cart',
          element: <UserCart />
        },
        {
          path: '/products',
          element: <ProductList />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App