import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const { login } = useAuth();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [animateError, setAnimateError] = useState(false);
    const navigate = useNavigate();

    const inputChange = (e, key) => {
        e.preventDefault();
        setCredentials(prevCredentials => {
            const newCredentials = {...prevCredentials, [key]: e.target.value};
            return newCredentials;
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnimateError(false);
        try {
            await login(credentials);
            setCredentials({
                email: '',
                password: '',
            });
            setLoading(false);
            navigate('/');
        } catch (err) {
            setLoading(false);
            setErrors(err.response.data.errors);
            setAnimateError(true);
        }
    }

    return (
        <div className="bg-grey-lighter min-h-[calc(100vh-68px)] flex flex-col">
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleLogin} method="POST" className="bg-white px-6 py-8 rounded border dark:border-gray-700 border-gray-300 shadow-lg text-black dark:bg-gray-800 dark:text-white w-full">
                    <div className="mb-4 space-y-2 text-center">
                        <h1 className="text-primary font-bold text-3xl">Login</h1>
                        <p className=" text-gray-500">Login and continue your blogging journey!</p>
                    </div>
                    <div className="group mb-4">
                        <label className="block group-focus-within:text-blue-600 text-gray-700 dark:text-gray-400 font-bold mb-2 transition ease-in-out duration-150" htmlFor="email">
                            Email
                        </label>
                        <input 
                            type="text"
                            id="email"
                            className={`block w-full bg-gray-200 dark:focus:placeholder-blue-600 dark:bg-gray-800 border-2 rounded py-2 px-3 mb-3 leading-tight focus:outline-none transition ease-in-out duration-150 ${errors && errors.email ? 'placeholder-red-500 border-red-500' : 'text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-600'} ${animateError && errors?.email ? 'animate-shake' : ''}`}
                            name="email"
                            value={credentials.email}
                            onChange={e => inputChange(e, 'email')}
                            placeholder="Email" />
                        {
                            errors && errors.email && <div className={`flex gap-1.5 items-center w-full text-red-500 ${animateError ? 'animate-shake' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            {errors.email[0]}
                        </div>
                        }
                    </div>
                    <div className="group mb-4">
                        <label className="block group-focus-within:text-blue-600 text-gray-700 dark:text-gray-400 font-bold mb-2 transition ease-in-out duration-150" htmlFor="password">
                            Password
                        </label>
                        <input 
                            type="password"
                            id="password"
                            className={`block w-full bg-gray-200 dark:focus:placeholder-blue-600 dark:bg-gray-800 border-2 rounded py-2 px-3 mb-3 leading-tight focus:outline-none transition ease-in-out duration-150 ${errors && errors.password ? 'placeholder-red-500 border-red-500' : 'text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-600'} ${animateError && errors?.password ? 'animate-shake' : ''}`}
                            name="password"
                            value={credentials.password}
                            onChange={e => inputChange(e, 'password')}
                            placeholder="Password" />
                        {
                            errors && errors.password && <div className={`flex gap-1.5 items-center w-full text-red-500 ${animateError ? 'animate-shake' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            {errors.password[0]}
                        </div>
                        }
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 font-semibold shadow rounded-md text-white bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-150"
                    >
                        {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}
                        Log in
                    </button>
                    <p className="mt-3 text-gray-600">
                        Don't have an account? <Link to="/signup" className="text-blue-500 font-medium hover:underline transition-all duration-500 ease-in-out">Sign up</Link> here.
                    </p>
                </form>
            </div>
        </div>
    )
}
