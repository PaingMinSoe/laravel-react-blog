import { useEffect, useState } from 'react'
import DummyImage from '../assets/aang-redirects-lightning.jpeg'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios";
import { CSSTransition } from 'react-transition-group';
import BlogCard from './BlogCard';

export default function BlogList({homepage, filters}) {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setBlogs([]);
        setLoading(true);
        let url = 'http://localhost:8000/api/blogs';

        const params = new URLSearchParams(location.search);
        const search = params.get('search');

        if (homepage) {
            url += '?limit=3';
        }

        if(search) {
            url += '?search=' + search;
        }

        if (filters && filters.length > 0) {
            url += search ? '&' : '?';
            filters.map((filter, index) => {
                url += `categories[]=${filter}${(index < filters.length - 1) ? '&' : ''}`;
            });
        }

        axios.get(url)
        .then(({data}) => {
            setLoading(false);
            setBlogs(data.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [homepage, setBlogs, filters, location]);

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 p-3">
                {blogs.map((item) => (
                    <BlogCard key={item.id} item={item} />
                ))}
            </div>
        </>
    )
}
