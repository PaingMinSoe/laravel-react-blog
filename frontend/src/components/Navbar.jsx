import { NavLink } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import darkModeIcon from "../assets/dark.svg";
import lightModeIcon from "../assets/light.svg";

export default function Navbar() {
    const {isDark, setIsDark} = useContext(ThemeContext);

    useEffect(() => {
        if (isDark === true) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);
    
    return (
        <nav className='w-full px-2 md:px-20 py-3 flex items-center justify-between shadow-md dark:bg-gray-800 dark:text-white'>
            <div className='font-bold text-2xl'>
                AvatarBlog
            </div>
            <ul className='flex items-center gap-x-4'>
                <li>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/blogs">
                        Blogs
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/create">
                        Create
                    </NavLink>
                </li>
                <li>

                </li>
                <li>
                    <img src={avatar} alt="" className='w-11 rounded-full' />
                </li>
                <li className='hidden md:block'>
                    <button className='cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2.5 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </li>
                <li className='hidden md:block'>
                    {!isDark && 
                    <button onClick={() => setIsDark(true)} className='cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2.5 rounded-lg'>
                        <img src={darkModeIcon} alt="" />
                    </button>}

                    {isDark &&
                    <button onClick={() => setIsDark(false)} className='cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2.5 rounded-lg'>
                        <img src={lightModeIcon} alt="" />
                    </button>}
                </li>
            </ul>
        </nav>
    )
}
