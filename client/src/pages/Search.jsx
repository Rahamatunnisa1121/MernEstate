import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 border-pink-200 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap text-pink-800 font-semibold font-sans '>Search Term:</label>
                    <input  type="text" id='searchTerm' placeholder="Search..." 
                            className='bg-pink-100 p-3 rounded-lg border border-pink-300 w-full '/>
                </div>
                <div className='flex gap-4 flex-wrap items-center'>
                    <label className='text-pink-800 font-semibold font-sans '>Type:</label>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="all" className='w-4 h-4 text-pink-500 accent-pink-500'/>
                        <span className='text-pink-600 font-semibold font-sans '>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="rent" className='w-4 h-4 text-pink-500 accent-pink-500' />
                        <span className='text-pink-600 font-semibold font-sans '>Rent</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="sale" className='w-4 h-4 text-pink-500 accent-pink-500'/>
                        <span className='text-pink-600 font-semibold font-sans '>Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="offer" className='w-4 h-4 text-pink-500 accent-pink-500'/>
                        <span className='text-pink-600 font-semibold font-sans '>Offer</span>
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap items-center'>
                    <label className='text-pink-800 font-semibold font-sans '>Amenities:</label>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="parking" className='w-4 h-4 text-pink-500 accent-pink-500' />
                        <span className='text-pink-600 font-semibold font-sans '>Parking</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="furnished" className='w-4 h-4 text-pink-500 accent-pink-500'/>
                        <span className='text-pink-600 font-semibold font-sans '>Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='text-pink-800 font-semibold font-sans '>Sort: </label>
                    <select id="sort_order"
                    className='border rounded-lg p-3 border-pink-300  focus:ring-pink-300 bg-pink-100 text-pink-600 font-semibold'>
                        <option>Price - high to low</option>
                        <option>Price - low to high</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                </div>
                <button className='bg-pink-200  text-pink-700 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>Search</button>
            </form>
        </div>
        <div className=''>
            <h1 className='text-2xl font-semibold border-b p-3 text-pink-700 mt-5'>Listing Results</h1>
        </div>
    </div>
  )
}
