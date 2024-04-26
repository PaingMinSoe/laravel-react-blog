import { useEffect, useState } from 'react'
import DummyImage from '../assets/aang-redirects-lightning.jpeg'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios";

export default function BlogList({homepage, filters}) {

    const [blogs, setBlogs] = useState([]);
    const [animateBlogs, setAnimateBlogs] = useState(false);

    let url = 'http://localhost:8000/api/blogs';

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const search = params.get('search');

    if (homepage) {
        url += '?limit=3';
    }

    if (search) {
        url += '?search=' + search;
    }

    if (filters && filters.length > 0) {
        url += search ? '&' : '?';
        filters.map((filter, index) => {
            url += `categories[]=${filter}${(index < filters.length - 1) ? '&' : ''}`;
        });
    }


    useEffect(() => {
        setAnimateBlogs(false);
        axios.get(url)
        .then(({data}) => {
            setBlogs(data.data);
            setAnimateBlogs(true);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [url]);

    return (
        <>
            <div className={`grid min-h-[calc(100vh-160px)] md:grid-cols-2 lg:grid-cols-3 gap-10 p-3 ${blogs && animateBlogs ? 'animate-fadeIn' : ''}`}>
                {blogs.map((item) => (
                    <Link to={`/blogs/${item.id}`} className='flex flex-col border max-h-[500px] border-gray-700 m-5 md:m-0 rounded-lg shadow-lg overflow-hidden' key={item.id}>
                        <img src={DummyImage} alt="" />
                        <div className='p-2.5 flex-grow'>
                            <h1 className='text-xl font-semibold'>{item.title}</h1>
                            <p className='space-x-2 py-2'>
                                {
                                    item.categories.map(category => (
                                        <span className='inline-block bg-blue-600 text-xs font-bold px-2 py-1 rounded-lg text-white hover:bg-blue-800 transition duration-100 ease-in-out' key={category.id}>{category.title}</span>
                                    ))
                                }
                            </p>
                            <p>
                                {`${item.body.slice(0,180)} ${item.body.length > 180 ? "..." : ""}`}
                            </p>
                        </div>
                        <div className='mx-2.5 mb-3'>
                            <button className='inline-flex items-center px-3 py-1.5 text-sm font-semibold shadow rounded-md text-white bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-150'>Read More</button>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
