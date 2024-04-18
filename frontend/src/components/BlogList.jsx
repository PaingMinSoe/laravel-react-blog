import { useEffect, useState } from 'react'
import DummyImage from '../assets/aang-redirects-lightning.jpeg'
import { Link } from 'react-router-dom'

export default function BlogList() {

    let [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/blogs')
        .then(res => res.json())
        .then(data => setBlogs(data.data));
    }, [setBlogs]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 p-3">
            {
                blogs.slice(0,3).map((item) => (
                    <Link className='flex flex-col border border-gray-600 m-5 md:m-0 rounded-lg shadow-lg overflow-hidden' key={item.id}>
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
                ))
            }
        </div>
    )
}
