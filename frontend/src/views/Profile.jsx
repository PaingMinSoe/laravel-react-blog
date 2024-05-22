import { useAuth } from "../contexts/AuthContext"
import AvatarImage from "../assets/avatar.jpg"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Form from "../components/Form";
import { axiosClient } from "../services/axiosClient";

export default function Profile() {
    const { user } = useAuth();
    const [isEdit, setIsEdit] = useState(false);
    const [preview, setPreview] = useState('');

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        profile_image: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setCredentials(prevCredentials => {
            return {...prevCredentials, name: user.name, email: user.email}
        });
    }, [user]);

    const handlePhotoChange = (e) => {
        setCredentials(prevCredentials => {
            return {...prevCredentials, profile_image: e.target.files[0]}
        });
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    const inputChange = (e, key) => {
        setCredentials(prevCredentials => {
            return {...prevCredentials, [key]: e.target.value};
        })
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(credentials.profile_image);
        const formData = new FormData();
        formData.append('name', credentials.name);
        formData.append('email', credentials.email);
        formData.append('profile_image', credentials.profile_image);
        formData.append('password', credentials.password);
        try {
            await axiosClient.post('/user/update', formData);
            setCredentials({
                name: '',
                email: '',
                password: '',
                profile_image: '',
            });
            setLoading(false);
            navigate('/');
        } catch (err) {
            setLoading(false);
            setErrors(err.response.data.errors);
        }
    }

    return (
        <div className="w-full min-h-[calc(100vh-212px)]">
            <div className="py-5">
                <button onClick={() => setIsEdit(prevEdit => !prevEdit)} className="inline-flex items-center px-4 py-2 font-semibold shadow rounded-md text-white bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-150">{!isEdit ? "Update Profile" : "Cancel Edit"}</button>
            </div>
            {!isEdit && (
                <div className="grid grid-cols-2 bg-white px-6 py-8 rounded border dark:border-gray-700 border-gray-300 shadow-lg text-black dark:bg-gray-800 dark:text-white w-full animate-fadeIn ease-in-out">
                    <h1 className="mb-5 text-2xl font-bold">Profile</h1>
                    <div className="w-full mb-5 col-span-2">
                        <img src={user.profile_image ? user.profile_image : AvatarImage} className="w-80 h-80 rounded-full" alt={user.name} />
                    </div>
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
            {isEdit && 
                <Form onSubmit={handleUpdateProfile} classes="grid grid-cols-2 gap-x-4 animate-fadeIn ease-in-out">
                    <h1 className="mb-5 text-2xl font-bold">Edit Profile</h1>
                    <div className="group mb-3 col-span-2">
                        <label htmlFor="profile_image" className="inline-block cursor-pointer hover:opacity-25 relative">
                            {!preview && <div className="absolute w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-44 h-44">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </div>}
                            <img src={preview ? preview : user.profile_image ? user.profile_image : AvatarImage} className="w-80 h-80 rounded-full" alt={user.name} />
                            <input onChange={handlePhotoChange} type="file" name="profile_image" id="profile_image" className="hidden" />
                        </label>
                    </div>
                    <Input 
                        type="text"
                        label="Name"
                        id="name"
                        name="name"
                        value={credentials.name}
                        onChange={e => inputChange(e, 'name')}
                        placeholder="Name"
                        error={errors.name}
                    />
                    
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
                        label="Confirm Password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={e => inputChange(e, 'password')}
                        placeholder="Enter password to confirm update." 
                        error={errors.password}
                    />
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 font-semibold shadow rounded-md text-white bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-150"
                        >
                            {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>}
                            Update
                        </button>
                    </div>
                </Form>
            }
        </div>
    )
}