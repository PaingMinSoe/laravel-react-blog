import axios from "axios";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../services/axiosClient";

export default function Create() {
    const [inputs, setInputs] = useState({
        title: '',
        body: '',
        categories: [],
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [animateError, setAnimateError] = useState(false);

    useEffect(() => {
        axiosClient.get('/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    }, []);
    
    const handleCreateBlog = async (e) => {
        e.preventDefault();
        console.log('WORKS', inputs);
        setLoading(true);
        setAnimateError(false);
        try {
            const response = await axiosClient.post('/blogs', inputs);
            console.log(response);
            setLoading(false);
            navigate('/');
        } catch (err) {
            console.error(err);
            setLoading(false);
            setErrors(err.response.data.errors);
            setAnimateError(true);
        }
    }

    const inputChange = (e, key) => {
        e.preventDefault();
        setInputs(prevCredentials => {
            const newInputs = {...prevCredentials, [key]: e.target.value};
            return newInputs;
        })
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
                        animateError={animateError}
                        error={errors?.title}
                    />
                    <Input 
                        type="textarea"
                        label="Body"
                        id="body"
                        name="body"
                        value={inputs.body}
                        onChange={e => inputChange(e, 'body')}
                        placeholder="Body" 
                        animateError={animateError}
                        error={errors?.body}
                    />
                </Form>
            </div>
        </div>
    )
}