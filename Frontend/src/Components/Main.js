import React from 'react'
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { Products } from './Store/products-data.js';
import Filter from './Filter.js';
import { useDispatch } from 'react-redux';
import { addItem } from './Store/cartSlice.js';

const Main = () => {
  const dispatch = useDispatch();

  return (
    <div className='main flex flex-col p-2 justify-center gap-y-10 my-20'>
      
      <h1 className='text-center text-4xl'>Obsessive Attention. Intelligent Effort.</h1>
      <p className='text-center text-slate-400'>Functional handbags made of luxurious materials to improve people's lives in small but mighty ways.</p>

      <div className='w-full flex flex-wrap justify-center gap-x-6 gap-y-6'>
        {
          Products.slice(0, 12).map(product =>
            <div className='flex flex-col gap-x-5 justify-around sm:justify-center items-center basis-1/5 border'>
              <Link key={product.id} to={`/product/${product.id}`}>
                <div>
                  <img className='h-full block mx-auto' src={product.image} alt='product-image' />
                </div>
                <div className='product-info text-center text-sm sm:text-lg'>
                  <p className='hidden sm:block'>{product.description}</p>
                  <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
                  <p>Price : ${product.price}</p>
                </div>
              </Link>
              <button className=' py-1 sm:py-2 px-2 sm:px-5 bg-yellow-500 text-white mt-4' onClick={() => dispatch(addItem(product))}>Add to Cart</button>
            </div>
          )
        }
      </div>
      <Link to='/products' className='text-center text-2xl'>View All Products...</Link>
    </div>
  )
}

export default Main