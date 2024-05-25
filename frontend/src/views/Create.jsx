import Form from "../components/Form";
import { useCallback, useEffect, useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../services/axiosClient";
import { useDropzone } from "react-dropzone";

export default function Create() {
    const [inputs, setInputs] = useState({
        title: '',
        body: '',
        categories: [],
        blog_image: null,
    });
    const [preview, setPreview] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const onDrop = useCallback(acceptedFiles => {
        const file = new FileReader;
        file.onload = () => {
            setPreview(file.result);
        }

        setInputs(prevInputs => {
            return {...prevInputs, blog_image: acceptedFiles[0]}
        });

        file.readAsDataURL(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});



    useEffect(() => {
        axiosClient.get('/categories')
        .then(res => setCategories(res.data.data))
        .catch(err => console.error(err));
    }, []);
    
    const handleCreateBlog = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', inputs.title);
            formData.append('body', inputs.body);
            for (let category of inputs.categories) {
                formData.append('categories[]', category);
            }
            formData.append('blog_image', inputs.blog_image);

            const response = await axiosClient.post('/blogs', formData);
            setLoading(false);
            navigate('/');
        } catch (err) {
            console.error(err);
            setLoading(false);
            setErrors(err.response.data.errors);
        }
    }

    const inputChange = (e, key) => {
        setErrors(prevErrors => {
            return {...prevErrors, [key]: null}
        });
        
        setInputs(prevInputs => {
            if (key === 'categories' && e.target.checked) {
                return {...prevInputs, categories: [...prevInputs.categories, e.target.value]}
            } else if (key === 'categories' && !e.target.checked) {
                return {...prevInputs, categories: prevInputs.categories.filter(prevCategories => prevCategories !== e.target.value)}
            }

            return {...prevInputs, [key]: e.target.value};
        });
    }

    return (
        <div className="bg-grey-lighter min-h-[calc(100vh-68px)] flex flex-col">
            <div className="container max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <Form onSubmit={handleCreateBlog} method="POST">
                    <h1 className="text-2xl text-center font-semibold mb-3">Create a Blog however you like it!</h1>
                    <Input 
                        type="text"
                        label="Title"
                        id="title"
                        name="title"
                        value={inputs.title}
                        onChange={e => inputChange(e, 'title')}
                        placeholder="Title" 
                        error={errors.title}
                    />
                    <Input 
                        type="textarea"
                        label="Body"
                        id="body"
                        name="body"
                        rows="10"
                        value={inputs.body}
                        onChange={e => inputChange(e, 'body')}
                        placeholder="Body" 
                        error={errors.body}
                    />
                    <div className="group mb-4">
                        <label className="block group-focus-within:text-blue-600 text-gray-700 dark:text-gray-400 font-bold mb-2 transition ease-in-out duration-150" htmlFor="name">
                            Categories
                        </label>
                        <div className={`group mb-3 ${errors.categories ? ' animate-shake border-red-600' : ''}`}>
                            {
                                categories.map((item) => {
                                    return (
                                        <div className="inline-flex m-1" key={item.id}>
                                            <input onChange={e => inputChange(e, 'categories')} type="checkbox" id={item.id} value={item.id} className="peer hidden" />
                                            <label htmlFor={item.id} className={`select-none cursor-pointer text-sm rounded-lg border border-gray-200 px-2 py-1 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 peer-checked:border-none peer-checked:text-gray-900 ${errors?.categories ? 'text-red-500 border-red-500' : ''}`}>
                                                {item.title}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            errors.categories && <div className={`flex gap-1.5 items-center w-full text-red-500 ${errors.categories ? 'animate-shake' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                {errors.categories[0]}
                            </div>
                        }
                    </div>
                    <div className="group mb-4">
                        <div {...getRootProps()} className="group mb-3">
                            <label className="block group-focus-within:text-blue-600 text-gray-700 dark:text-gray-400 font-bold mb-2 transition ease-in-out duration-150" htmlFor="blogImage">
                                Blog Image
                            </label>
                            <input {...getInputProps()} id="blogImage" />
                            <div className={`w-full min-h-[100px] h-64 border-4 rounded-md border-dashed flex flex-col items-center justify-center ${errors.blog_image ? 'animate-shake border-red-600' : 'border-gray-600'} ${isDragActive ? 'bg-gray-900 bg-opacity-75' : ''}`}>
                                <p className={`${errors.blog_image ? 'text-red-500' : 'text-gray-500'} text-xl font-semibold`}>
                                    {isDragActive ? 'Drag and Drop the image for blog here.' : 'Click or Drag and Drop the image for blog here.'}
                                </p>
                            </div>
                        </div>
                        {
                            errors.blog_image && <div className={`flex gap-1.5 items-center w-full text-red-500 ${errors.blog_image ? 'animate-shake' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                {errors.blog_image[0]}
                            </div>
                        }
                    </div>
                    <div className="mb-4">
                        {
                            preview && <img src={preview} alt="" />
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
                        Create
                    </button>
                </Form>
            </div>
        </div>
    )
}