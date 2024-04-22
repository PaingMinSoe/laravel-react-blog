import { NavLink, useLocation, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import darkModeIcon from "../assets/dark.svg";
import lightModeIcon from "../assets/light.svg";
import NavButton from "./NavButton";
import { CSSTransition } from "react-transition-group";
import SearchModal from "./SearchModal";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Navbar() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const {isDark, setIsDark} = useContext(ThemeContext);
    
    return (    
        <nav className='w-full px-2 md:px-20 py-3 flex items-center justify-between shadow-md dark:bg-gray-800 dark:text-white'>
            {
                createPortal(<CSSTransition
                    in={isSearchModalOpen}
                    timeout={100}
                    classNames="modal"
                    unmountOnExit
                >
                    <SearchModal setIsOpen={setIsSearchModalOpen} />
                </CSSTransition>, document.querySelector('#modal'))
            }
            
            <div className="md:hidden">
                <NavButton>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </NavButton>
            </div>
            <div className='font-bold text-2xl'>
                AvatarBlog
            </div>
            <ul className='flex items-center gap-x-4'>
                <li className='hidden md:block'>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li className='hidden md:block'>
                    <NavLink to="/blogs">
                        Blogs
                    </NavLink>
                </li>
                <li>
                    <img src={avatar} alt="" className='w-11 rounded-full' />
                </li>
                <li className="hidden md:block">
                    <NavButton onClick={() => navigate('/create')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </NavButton>
                </li>
                <li className='hidden md:block'>
                    <NavButton onClick={() => setIsSearchModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </NavButton>
                </li>
                <li className='hidden md:block'>
                    <button onClick={() => setIsDark(prevDark => !prevDark)} className='cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2.5 rounded-lg'>
                        {!isDark ? <img src={darkModeIcon} alt="" /> : <img src={lightModeIcon} alt="" />}
                    </button>
                </li>
            </ul>
        </nav>
    )
}
