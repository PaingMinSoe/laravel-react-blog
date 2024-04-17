import { useEffect, useState } from 'react'
import DummyImage from '../assets/aang-redirects-lightning.jpeg'
import { Link } from 'react-router-dom'

export default function BlogList() {

    let [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/blogs')
        .then(res => res.json())
        .then(data => setBlogs(data));
    }, [setBlogs]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 p-3">
            {
                blogs.slice(0,3).map((item) => (
                    <Link className=' border m-5 md:m-0 rounded-lg border-gray-600 shadow-lg min-h-[430px] overflow-hidden' key={item.id}>
                        <img src={DummyImage} alt="" />
                        <div className='space-y-2 py-2 px-5'>
                            <h1 className='text-xl font-semibold'>{item.title}</h1>
                            <p>
                                {item.body}
                            </p>
                            <button className='px-4 py-1.5 rounded-lg bg-blue-200 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-900 transition-all ease-in'>Read More</button>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
