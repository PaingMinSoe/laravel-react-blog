import { Link, NavLink, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import { useState } from "react";
import { createPortal } from "react-dom";
import darkModeIcon from "../assets/dark.svg";
import lightModeIcon from "../assets/light.svg";
import NavButton from "./NavButton";
import { CSSTransition } from "react-transition-group";
import SearchModal from "./SearchModal";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const {isDark, setIsDark} = useTheme();
    const navigate = useNavigate();
    
    const { logout, isLoggedIn } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            setOpenNav(false);
        } catch (err) {
            console.error(err);
        } 
    }

    return (    
        <header>
            <nav className='w-full px-2 md:px-20 py-3 flex items-center justify-between shadow-md dark:bg-gray-800 dark:text-white z-10'>
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
                    <Link to="/">
                        AvatarBlog
                    </Link>
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
                    <li className="relative transiiton-all duration-500 z-10">
                        <img onClick={() => setOpenNav(prevNav => !prevNav)} src={avatar} alt="" className='w-11 rounded-full' />
                        <ul className={`absolute w-36 right-0 bg-white dark:bg-gray-800 ${openNav ? 'flex flex-col' : 'hidden'} rounded shadow-lg mt-2`}>
                            <li className="px-4 py-3 flex items-center">
                                <NavLink onClick={() => setOpenNav(false)} to="/profile">Profile</NavLink>
                            </li>
                            <li className="px-4 py-3 flex items-center">
                                <NavLink onClick={() => setOpenNav(false)} to="/dashboard">Dashboard</NavLink>
                            </li>
                            {isLoggedIn && <li className="px-4 py-3 flex items-center">
                                <button onClick={handleLogout}>Logout</button>
                            </li>}
                        </ul>
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
        </header>
    )
}
