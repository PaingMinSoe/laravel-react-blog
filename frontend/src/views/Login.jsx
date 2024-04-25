import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.get("http://localhost:8000/sanctum/csrf-cookie", {
            withCredentials: true,
            withXSRFToken: true
        })
        .then(() => {
            axios.post("http://localhost:8000/api/login", {
                email,
                password
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
        });
    }

    return (
        <div className="bg-grey-lighter min-h-[calc(100vh-68px)] flex flex-col">
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleLogin} method="POST" className="bg-white px-6 py-8 rounded border dark:border-gray-700 border-gray-200 shadow-md text-black dark:bg-gray-800 dark:text-white w-full">
                    <div className="mb-4 space-y-2 text-center">
                        <h1 className="text-primary font-bold text-3xl">Login</h1>
                        <p className=" text-gray-500">Login and continue your blogging journey!</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            type="text"
                            id="email"
                            className="appearance-none block w-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-blue-600 dark:focus:border-blue-600 transition ease-in-out duration-150"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-400 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            type="password"
                            id="password"
                            className="appearance-none block w-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-blue-600 dark:focus:border-blue-600 transition ease-in-out duration-150"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password" />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 font-semibold shadow rounded-md text-white bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-150"
                    >
                        {/* {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>} */}
                        Log in
                    </button>
                </form>
            </div>
        </div>
    )
}
