import React, { useState, useEffect, useContext } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
// import { checkUser, getCookie } from './CheckValidUser';
import Rating from '@mui/material/Rating';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addItem } from './Store/cartSlice';
import { Products } from './Store/products-data';


// here i will show all the data.
const ProductInfo = () => {
  const { _id } = useParams();
  const dispatch = useDispatch()

  return (
    <div className='block sm:flex'>
      <h1 className='text-2xl my-10 block sm:hidden'>{Products[_id - 1].description}</h1>
      <div className='basis-1/2'>
        <img className='w-[400px] block mx-auto my-10' src={Products[_id - 1].image} alt="product-image" />
      </div>

      <div className='basis-0 sm:basis-1/2 font-[inter] py-10 text-center'>
        <h1 className='hidden sm:block text-2xl my-10'>{Products[_id - 1].description}</h1>
        <Rating name="read-only" value={Products[_id - 1].rating} readOnly />
        <h3 className='text-2xl my-10'>price : ${Products[_id - 1].price}</h3>
        <button className='bg-amber-300 hover:bg-amber-400 w-[40%] mx-5 my-10 p-3' onClick={() => dispatch(addItem(Products[_id-1]))}>Add To Cart</button>
      </div>
    </div>
  )
}


export default ProductInfo