import { useAuth } from "../contexts/AuthContext"
import AvatarImage from "../assets/avatar.jpg"
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Form from "../components/Form";
import { useDropzone } from "react-dropzone";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import CropImageModal from "../components/CropImageModal";

export default function Profile() {
    const { user, updateProfile } = useAuth();
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
    const [isCropImageModalOpen, setIsCropImageModalOpen] = useState(false);
      

    useEffect(() => {
        console.log(credentials);
    }, [credentials]);

    const navigate = useNavigate();

    const onDrop = useCallback(acceptedFiles => {
        const file = new FileReader;

        file.onload = () => {
            console.log(file.result);
            setPreview(file.result);
        }

        setCredentials(prevCredentials => {
            return {...prevCredentials, profile_image: acceptedFiles[0]}
        });

        file.readAsDataURL(acceptedFiles[0]);

        setIsCropImageModalOpen(true);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    useEffect(() => {
        setCredentials(prevCredentials => {
            return {...prevCredentials, name: user.name, email: user.email}
        });
    }, [user]);


    const inputChange = (e, key) => {
        setCredentials(prevCredentials => {
            return {...prevCredentials, [key]: e.target.value};
        })
    }

    const saveCroppedImage = (canvas) => {
        const croppedImage = canvas.toDataURL('image/jpeg');

        canvas.toBlob((blob) => {
            const imageFile = new File([blob], credentials.profile_image.name, {type: 'image/jpeg'});
            setCredentials(prevCredentials => {
                return {...prevCredentials, profile_image: imageFile}
            });
        }, 'image/jpeg');
        
        setPreview(croppedImage);
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', credentials.name);
        formData.append('email', credentials.email);
        formData.append('password', credentials.password);
        if (credentials.profile_image) {
            formData.append('profile_image', credentials.profile_image);
        }
        try {
            await updateProfile(formData);
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
            {
                createPortal(<CSSTransition
                    in={isCropImageModalOpen}
                    timeout={100}
                    classNames="modal"
                    unmountOnExit
                >
                    <CropImageModal imgSrc={preview} setPreview={setPreview} onCropComplete={saveCroppedImage} setIsOpen={setIsCropImageModalOpen} />
                </CSSTransition>, document.querySelector('#modal'))
            }
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
                    <div {...getRootProps()} className="group mb-3 col-span-2 w-80 h-80 relative cursor-pointer">
                        <input {...getInputProps()} id="profile_image" />
                        {
                            isDragActive && <div className="absolute w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full">
                                <p className="text-lg">Drag and Drop Here.</p>
                            </div>
                        }
                        <label htmlFor="profile_image" className="absolute bottom-0 p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-800 hover:text-white hover:dark:bg-gray-100 hover:dark:text-black transition-colors duration-300 ease-in-out cursor-pointer rounded-full right-12 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </label>
                        <img src={preview ? preview : user.profile_image ? user.profile_image : AvatarImage} className="w-80 h-80 rounded-full" alt={user.name} />
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