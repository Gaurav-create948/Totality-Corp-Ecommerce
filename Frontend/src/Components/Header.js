import { Link } from "react-router-dom";
import React from 'react'

const Header = () => {
    return (
        <div className='bg-fixed h-[300px]' style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>
            <div className='absolute h-[300px] w-full bg-[rgba(0,0,0,0.7)] z-10 flex justify-center items-center text-4xl'></div>
            <div className='absolute top-32 sm:top-1/4 left-8 sm:left-1/4 flex flex-col justify-around gap-y-5 z-10 text-white'>
                <h1 className='text-2xl sm:text-5xl'>Industrial design meets fashion.</h1>
                <p className='text-md sm:text-2xl text-center'>All premium brands available at one click</p>
                <Link to='/products' className="flex justify-center">
                    <button className='border p-2 w-1/2 rounded-none hover:bg-white hover:text-black'>Shop Now</button>
                </Link>
            </div>
        </div>
    )
}
export default Header