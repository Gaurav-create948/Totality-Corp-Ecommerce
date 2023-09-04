import React, { useState } from 'react'
import Filter from "./Filter.js";
import { Products } from "./Store/products-data.js";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { addItem } from './Store/cartSlice.js';
import { useDispatch } from 'react-redux';
import SortIcon from '@mui/icons-material/Sort';


const ProductList = () => {
  const [ProductsList, setProductsList] = useState(Products);
  const dispatch = useDispatch()
  let [showSideFilter, setShowSideFilter] = useState(false);
  let [sm, setSm] = useState(window.innerWidth <= 640);

  function categoryFilter(param) {
    if (param === 'all') {
      setProductsList(Products);
    }
    else {
      setProductsList(() => Products.filter(product => product.category === param));
    }
  }

  function priceFilter(param) {
    const filterAfterPrice = Products.filter(product => product.rating >= param);
    setProductsList(filterAfterPrice);
  }

  function hideFilter(){
    setShowSideFilter(prev => showSideFilter = !prev)
  }

  return (
    <div className='block sm:flex justify-center gap-y-5'>
      <p className='block sm:hidden' onClick={() => setShowSideFilter(prevValue => showSideFilter = !prevValue)}>Filter</p>
      <Filter categoryFilter={categoryFilter} priceFilter={priceFilter} showSideFilter={showSideFilter} hideFilter={hideFilter} sm={sm}/>
      <div className='w-full sm:w-[80%]  sm:flex sm:flex-wrap justify-center gap-x-3 gap-y-5'>
        {
          ProductsList.map(product =>
            <div className='flex flex-row sm:flex-col justify-center items-center basis-1/4 border p-4'>
              <Link key={product.id} to={`/product/${product.id}`}>
                <div>
                  <img className='w-[200px] h-[200px]' src={product.image} alt='product-image' />
                </div>
                <div className='product-info text-center text-sm sm:text-lg'>
                  <p>{product.description.length > 20 ? product.description.substring(0, 25) : product.description}</p>
                  <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
                  <p>Price : ${product.price}</p>
                </div>
              </Link>
              <button className='p-2 sm:py-2 sm:px-5 bg-yellow-500 text-white mt-4' onClick={() => dispatch(addItem(product))}>Add to Cart</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ProductList;