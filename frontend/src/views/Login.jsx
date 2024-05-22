import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Input from "../components/Input";
import Form from "../components/Form";

export default function Login() {
    const { login } = useAuth();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const inputChange = (e, key) => {
        setErrors(prevErrors => {
            return {...prevErrors, [key]: null}
        });

        setCredentials(prevCredentials => {
            const newCredentials = {...prevCredentials, [key]: e.target.value};
            return newCredentials;
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(credentials);
            setCredentials({
                email: '',
                password: '',
            });
            setLoading(false);
            navigate('/profile');
        } catch (err) {
            setLoading(false);
            setErrors(err.response.data.errors);
        }
    }

    return (
        <div className="bg-grey-lighter min-h-[calc(100vh-212px)] flex flex-col">
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <Form onSubmit={handleLogin} method="POST">
                    <div className="mb-4 space-y-2 text-center">
                        <h1 className="text-primary font-bold text-3xl">Login</h1>
                        <p className=" text-gray-500">Login and continue your blogging journey!</p>
                    </div>
                    <Input 
                        type="email"
                        label="Email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={e => inputChange(e, 'email')}
                        placeholder="Email"
                        error={errors.email}
                    />

                    <Input 
                        type="password"
                        label="Password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={e => inputChange(e, 'password')}
                        placeholder="Password" 
                        error={errors.password}
                    />
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
                </Form>
            </div>
        </div>
    )
}
