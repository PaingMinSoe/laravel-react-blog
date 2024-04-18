export default function SearchModal({search, handleSearch, setSearch, setIsOpen}) {
    let closeModal = (e) => {
        e.preventDefault();
        setIsOpen((prevState) => !prevState);
    }

    return (
        <div className='w-screen h-screen left-0 right-0 top-0 z-10 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 fixed flex justify-center items-center' onClick={closeModal}>
            <div className="w-[500px] flex justify-around items-center space-x-2 p-5 rounded-lg bg-white dark:bg-gray-800 shadow-lg" onClick={(e) => e.stopPropagation()}>
                <input type="text" value={search} onKeyDown={e => e.key === 'Enter' ? handleSearch() : null} onChange={e => setSearch(e.target.value)} placeholder='Search Blog...' className='outline-none px-2 py-2 dark:text-white dark:bg-transparent rounded-lg' />
                <button onClick={handleSearch} className='px-4 py-1.5 rounded-lg bg-blue-200 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-900 transition-all ease-in'>
                    Search
                </button>
            </div>
        </div>
    )
}
