import React, { useState, useEffect, useContext } from 'react';
import { useQuery, QueryClient, useMutation } from 'react-query';
import axios from 'axios';
// import { AuthContext } from './Context/authContext';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, removeItem, increment, decrement } from './Store/cartSlice';
import { displayRazorpay } from './Checkout';


const UserCart = () => {
    const cart = useSelector(state => state.cart.items);
    const total_Price = useSelector(state => state.cart.totalPrice)
    const dispatch = useDispatch();


    function updateQuantity(e, id) {
        const btn = e.target.closest('.btn');
        if (btn) {
            if (btn.textContent === '+') {
                //increase quantity
                dispatch(increment(id));
            }
            else {
                //decrease quantity
                dispatch(decrement(id));
            }
        }
    }

    function deleteItem(user_id, product_id) {
        axios.patch('https://ecommerce-app-jof9.onrender.com/deleteCartItem', { user_id, product_id });
    }

    return (
        <div className='container block sm:flex gap-10 mt-[10%] h-screen'>
            <div className='container flex flex-col gap-10 left'>
                {
                    cart.length ?
                    <div className='headings flex item-left justify-around text-slate-400 font-[Montserrat] font-light'>
                        <p>product</p>
                        <p>quantity</p>
                        <p>price</p>
                    </div> 
                    :
                    ''
                }
                {
                    cart.length ? cart.map(data =>
                        <div key={data.product_id} className='cart-data flex justify-around'>
                            <div className='w-[35%] flex justify-around gap-2'>
                                <img className='w-[150px]' src={data.image} alt='product-image' />
                                <span className='flex m-auto'>{data.product_title}</span>
                            </div>

                            <div className='flex gap-5 m-auto'>
                                <div className='flex py-3 px-3 gap-3 border border-solid border-slate-500' onClick={(e) => updateQuantity(e, data.id)}>
                                    <button className='btn bg-slate-300 px-2'>-</button>
                                    <span className='price'>{data ? data.quantity : 'loading...'}</span>
                                    <button className='btn bg-slate-300 px-2'>+</button>
                                </div>
                                <i
                                    className="fa-regular fa-trash-can text-slate-500 m-auto"
                                    onClick={() => dispatch(removeItem(data.id))}>
                                </i>

                            </div>
                            <div className='flex m-auto'>
                                <p>$ {data.quantity * data.price}</p>
                            </div>
                        </div>
                    )
                        :
                        <h1 className='text-center text-4xl'>Your Cart is Empty</h1>
                }
            </div>

            <div className='right w-full sm:w-[30%] text-center h-fit bg-slate-50 py-20 px-10'>
                <p className='text-lg leading-10'>
                    Subtotal : ${total_Price}
                </p>
                <button className='w-full rounded-md bg-amber-300 hover:bg-amber-400 text-white p-3' onClick={() => displayRazorpay(total_Price)}>Checkout</button>
            </div>
        </div>
    )
}

export default UserCart;