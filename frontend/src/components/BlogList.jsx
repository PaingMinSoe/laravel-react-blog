import { useEffect, useState } from 'react'
import DummyImage from '../assets/aang-redirects-lightning.jpeg'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios";

export default function BlogList({homepage, filters}) {

    const [blogs, setBlogs] = useState([]);

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
        axios.get(url)
        .then(({data}) => {
            setBlogs(data.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [url]);

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 p-3">
                {blogs.map((item) => (
                    <Link className='flex flex-col border border-gray-700 m-5 md:m-0 rounded-lg shadow-lg overflow-hidden' key={item.id}>
                        <img src={DummyImage} alt="" />
                        <div className='p-2.5 flex-grow'>
                            <h1 className='text-xl font-semibold'>{item.title}</h1>
                            <p>
                                {`${item.body.slice(0,180)} ${item.body.length > 180 ? "..." : ""}`}
                            </p>
                        </div>
                        <div className='mx-2.5 mb-3'>
                            <button className='px-4 py-1.5 rounded-lg bg-blue-200 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-900 transition-all ease-in'>Read More</button>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
