import React from 'react';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
export default function Search() {
    const [loading,setLoading]=useState(false);
    const [listings,setListings]=useState([]);
    const [showMore, setShowMore] = useState(false);
    const [sidebarData,setSidebarData]=useState({
        searchTerm:'',
        type:'all',
        parking:false,
        offer: false,
        furnished:false,
        sort:"createdAt",
        order:'desc',
    });
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search);
        const searchTermFromURL=urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        if(searchTermFromURL || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl)
        {
            setSidebarData({
                searchTerm:searchTermFromURL || '',
                type:typeFromUrl || 'all',
                parking:parkingFromUrl==='true'?true:false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'createdAt',
                order: orderFromUrl || 'desc',
            });
        };
        const fetchListings=async()=>{
            setLoading(true);
            const searchQuery=urlParams.toString();
            const res=await fetch(`/api/listing/getListings?${searchQuery}`);
            const data=await res.json();
            if(data.length>8)
            {
                setShowMore(true);
            }
            console.log(data);
            setListings(data);
            setLoading(false);
        };
        fetchListings();
    },[location.search]);
    //console.log(sidebarData);
    const navigate=useNavigate();
    const handleChange=(e)=>{
        if(e.target.id==='all' || e.target.id==='rent' || e.target.id==='sale')
        {
            setSidebarData({...sidebarData,type:e.target.id});
        }
        else if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer')
        {
            setSidebarData({...sidebarData,
                [e.target.id]:e.target.checked || e.target.checked==='true' ? true:false});
        }
        else if(e.target.id==='searchTerm')
        {
            setSidebarData({...sidebarData,searchTerm:e.target.value});
        }
        else if(e.target.id==='sort_order')
        {
            const sort=e.target.value.split('_')[0] || 'createdAt';
            const order=e.target.value.split('_')[1] || 'desc';
            setSidebarData({...sidebarData,sort:sort,order:order})
        }
        
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams();
        urlParams.set('searchTerm',sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/getListings?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
          setShowMore(false);
        }
        setListings([...listings, ...data]);
      };
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 border-pink-200 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap text-pink-800 font-semibold font-sans '>Search Term:</label>
                    <input  type="text" id='searchTerm' placeholder="Search..." value={sidebarData.searchTerm} onChange={handleChange}
                            className='bg-pink-100 p-3 rounded-lg border border-pink-300 w-full '/>
                </div>
                <div className='flex gap-4 flex-wrap items-center'>
                    <label className='text-pink-800 font-semibold font-sans '>Type:</label>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="all" className='w-4 h-4 text-pink-500 accent-pink-500'
                        onChange={handleChange} checked={sidebarData.type==='all'}/>
                        <span className='text-pink-600 font-semibold font-sans '>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="rent" className='w-4 h-4 text-pink-500 accent-pink-500'
                        onChange={handleChange} checked={sidebarData.type==='rent'} />
                        <span className='text-pink-600 font-semibold font-sans '>Rent</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="sale" className='w-4 h-4 text-pink-500 accent-pink-500'
                        onChange={handleChange} checked={sidebarData.type==='sale'}/>
                        <span className='text-pink-600 font-semibold font-sans '>Sale</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="offer" className='w-4 h-4 text-pink-500 accent-pink-500'
                        onChange={handleChange} checked={sidebarData.offer}/>
                        <span className='text-pink-600 font-semibold font-sans '>Offer</span>
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap items-center'>
                    <label className='text-pink-800 font-semibold font-sans '>Amenities:</label>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="parking" className='w-4 h-4 text-pink-500 accent-pink-500'
                         onChange={handleChange} checked={sidebarData.parking} />
                        <span className='text-pink-600 font-semibold font-sans '>Parking</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox" id="furnished" className='w-4 h-4 text-pink-500 accent-pink-500'
                         onChange={handleChange} checked={sidebarData.furnished}/>
                        <span className='text-pink-600 font-semibold font-sans '>Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='text-pink-800 font-semibold font-sans '>Sort: </label>
                    <select id="sort_order"
                    onChange={handleChange}
                    defaultValue={'created_at_desc'}
                    className='border rounded-lg p-3 border-pink-300  focus:ring-pink-300 bg-pink-100 text-pink-600 font-semibold'>
                        <option value={'regularPrice_desc'}>Price - high to low</option>
                        <option value={'regularPrice_asc'}>Price - low to high</option>
                        <option value={'createdAt_desc'}>Latest</option>
                        <option value={'createdAt_asc'}>Oldest</option>
                    </select>
                </div>
                <button className='bg-pink-200  text-pink-700 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>Search</button>
            </form>
        </div>
        <div className='flex-1'>
            <h1 className='text-2xl font-semibold border-b p-3 text-pink-700 mt-5'>Listing Results</h1>
            <div className='p-7 flex flex-wrap gap-4'>
                {!loading && listings.length===0 && (
                    <p className='text-xl text-red-500'>No listing found!</p>
                )}
                 {loading && (
                    <p className='text-xl text-green-700 text-center w-full'>
                    Loading...
                    </p>
                )}
                {!loading &&
                    listings &&
                    listings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                ))}
                {showMore && (
                    <button className='text-green-700 hover:underline p-7 text-center w-full'
                    onClick={()=>{
                        onShowMoreClick();
                    }}>
                    Show more
                    </button>
                )}
            </div>
        </div>
    </div>
  );
}
