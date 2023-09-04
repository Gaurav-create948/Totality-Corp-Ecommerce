import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Navbar = () => {
  const cart = useSelector(state => state.cart.items);


  return (
    <div className='flex justify-around item-center p-4'>

      <Link to='/' className='my-auto text-3xl'>Ecommerce</Link>

      <div className='flex my-auto w-[100px] justify-center'>
        <Link to='/cart'>
          <ShoppingBagOutlinedIcon fontSize='large'/>
          <span className='bg-red-500 rounded-full text-center text-white px-1'>{cart.length}</span>
        </Link>
      </div>
    </div>

  )
}

export default Navbar