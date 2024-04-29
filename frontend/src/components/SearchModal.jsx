import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchModal({setIsOpen}) {
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchValue = params.get('search');

    const [search, setSearch] = useState(searchValue ?? "");

    const handleSearch = () => {
        navigate('/blogs?search='+search);
        setIsOpen(false);
    }

    let closeModal = (e) => {
        e.preventDefault();
        setIsOpen((prevState) => !prevState);
    }

    return (
        <div className='w-screen h-screen left-0 right-0 top-0 z-10 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 fixed flex justify-center items-center' onClick={closeModal}>
            <div className=" w-96 md:w-[500px] flex justify-around items-center space-x-2 p-5 rounded-lg bg-white dark:bg-gray-800 shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center">                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input autoFocus type="text" value={search} onKeyDown={e => e.key === 'Enter' ? handleSearch() : null} onChange={e => setSearch(e.target.value)} placeholder='Search Blog...' className='outline-none px-2 py-2 dark:text-white dark:bg-transparent rounded-lg' />
                </div>
                <button onClick={handleSearch} className='px-4 py-1.5 rounded-lg bg-blue-200 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-900 transition-all ease-in'>
                    Search
                </button>
            </div>
        </div>
    )
}
