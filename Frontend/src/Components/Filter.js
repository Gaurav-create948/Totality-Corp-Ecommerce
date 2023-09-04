import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { faListNumeric } from '@fortawesome/free-solid-svg-icons';
import ClearIcon from '@mui/icons-material/Clear';


const Filter = ({ categoryFilter, priceFilter, showSideFilter, hideFilter, sm }) => {

    const [checked, setChecked] = useState({
        all: false,
        mens: false,
        womens: false
    })

    function handleCategory(e) {
        let name;
        if (e.target.closest('.checkbox')) {
            name = e.target.closest('.checkbox').name;
        }
        else if (e.target.closest('span')) {
            name = e.target.closest('span').textContent.toLowerCase();
        }
        else {
            console.log(null);
        }

        if (name) {
            setChecked((prevValue) => {
                if (name === 'all') {
                    return {
                        all: true,
                        mens: false,
                        womens: false
                    }
                }
                if (name === 'mens') {
                    return {
                        all: false,
                        mens: true,
                        womens: false
                    }
                }
                if (name === 'womens') {
                    return {
                        all: false,
                        mens: false,
                        womens: true
                    }
                }
            });
        }

        categoryFilter(name);
    }


    function handleRating(e) {
        const rating = e.target.closest('p').textContent[0];
        if (rating) {
            priceFilter(+rating) // This will log the closest element with the class 'rating'
        }
    }

    return (
        <div className='hidden sm:block flex flex-col gap-y-5 bg-white sticky top-[0px] h-[calc(100vh-0px)] border-r-2 border-slate-300'>
            <div className={`block sm:hidden flex flex-col gap-y-5 bg-white sticky top-[0px] h-[calc(100vh-0px)] border-r-2 border-slate-300 ${showSideFilter ? 'block' : 'hidden'}`}>
                <h1 className='text-lg'>Filter By Category and Price</h1>
                <ClearIcon visibility='false' onClick={hideFilter} />
                <section className='category flex flex-col gap-y-2' onClick={handleCategory}>
                    <h2>Category</h2>
                    <div>
                        <label for='all'>
                            <input type='checkbox' className='checkbox' name='all' checked={checked.all} />
                            <span>All</span>
                        </label>
                    </div>
                    <div>
                        <label for='male'>
                            <input type='checkbox' className='checkbox' name='mens' checked={checked.mens} />
                            <span>Mens</span>
                        </label>
                    </div>
                    <div>
                        <label for='male'>
                            <input type='checkbox' className='checkbox' name='womens' checked={checked.womens} />
                            <span>Womens</span>
                        </label>
                    </div>
                </section>
                <hr />
                <section className='flex flex-col gap-y-2'>
                    <h2>Price</h2>
                    <div>
                        <label for='min'>Min: </label>
                        <input type='number' placeholder='Min price' />

                    </div>
                    <div>
                        <label for='max'>Max: </label>
                        <input type='number' placeholder='Max price' />
                    </div>
                </section>
                <hr />
                <section className='flex flex-col gap-y-3' onClick={handleRating}>
                    <h2>Rating</h2>
                    <p className='flex'>
                        <Rating name="read-only" className='rating' value={4.0} readOnly />
                        4 or upto
                    </p>
                    <p className='flex'>
                        <Rating name="read-only" className='rating' value={3.0} readOnly />
                        3 or upto
                    </p>
                    <p className='flex'>
                        <Rating name="read-only" className='rating' value={2.0} readOnly />
                        2 or upto
                    </p>
                    <p className='flex'>
                        <Rating name="read-only" className='rating' value={1.0} readOnly />
                        1.0 or upto
                    </p>
                </section>
            </div>
        // </div>
    )
}

export default Filter