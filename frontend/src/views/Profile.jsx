import { useAuth } from "../contexts/AuthContext"
import AvatarImage from "../assets/avatar.jpg"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Form from "../components/Form";

export default function Profile() {
    const { user } = useAuth();
    const [isEdit, setIsEdit] = useState(false);

    const { register } = useAuth();

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnimateError(false);
        try {
            await register(credentials);
            setCredentials({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
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
        <div className="w-full mt-10 grid grid-cols-[30%_70%]">
            <div className="w-full">
                {user && <img src={AvatarImage} className="w-80 h-80 rounded-full" alt={user.name} />}
            </div>
            {user && <div className="flex flex-col">
                {!isEdit && (
                    <div className="grid grid-cols-2 bg-white px-6 py-8 rounded border dark:border-gray-700 border-gray-300 shadow-lg text-black dark:bg-gray-800 dark:text-white w-full animate-fadeIn">
                        <div className="mb-4">
                            <label className="block group-focus-within:text-blue-600 text-gray-700 dark:text-gray-400 font-bold mb-2 transition ease-in-out duration-150" htmlFor="name">
                                Name
                            </label>
                            <p className="ms-4">
                                {user.name}
                            </p>
                        </div>
                        <div className="mb-4">
                            <label className="block group-focus-within:text-blue-600 text-gray-700 dark:text-gray-400 font-bold mb-2 transition ease-in-out duration-150" htmlFor="name">
                                Email
                            </label>
                            <p className="ms-4">
                                {user.email}
                            </p>
                        </div>
                    </div>
                )}
                {isEdit && <Form onSubmit={handleSignup} classes="grid grid-cols-2 gap-x-4 animate-fadeIn">
                    <Input 
                        type="text"
                        label="Name"
                        id="name"
                        name="name"
                        value={credentials.name}
                        onChange={e => inputChange(e, 'name')}
                        placeholder="Name"
                        animateError={animateError}
                        error={errors?.name}
                    />
                    
                    <Input 
                        type="email"
                        label="Email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={e => inputChange(e, 'email')}
                        placeholder="Email" 
                        animateError={animateError}
                        error={errors?.email}
                    />

                    <Input 
                        type="password"
                        label="Password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={e => inputChange(e, 'password')}
                        placeholder="Password" 
                        animateError={animateError}
                        error={errors?.password}
                    />

                    <Input 
                        type="password"
                        label="Password Confirmation"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={credentials.password_confirmation}
                        onChange={e => inputChange(e, 'password_confirmation')}
                        placeholder="Password Confirmation"
                        animateError={animateError}
                        error={errors?.password_confirmation} 
                    />
                    <div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 font-semibold shadow rounded-md text-white bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-150"
                        >
                            {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>}
                            Sign up
                        </button>
                    </div>
                </Form>}
                <div className="mt-5">
                    <button onClick={() => setIsEdit(prevEdit => !prevEdit)} className="inline-flex items-center px-4 py-2 font-semibold shadow rounded-md text-white bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-150">Update Profile</button>
                </div>
            </div>}
        </div>
    )
}