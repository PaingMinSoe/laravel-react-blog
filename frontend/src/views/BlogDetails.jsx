import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function BlogDetails() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/blogs/${id}`)
        .then(({data}) => {
            setBlog(data.data);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [setBlog, id]);

    return (
        <div>
            {blog && (
                <div>
                    <div>{blog.title}</div>
                    <div>{blog.body}</div>
                </div>
            )}
        </div>
    )
}
