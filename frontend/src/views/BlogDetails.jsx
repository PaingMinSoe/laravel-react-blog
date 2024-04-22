import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/blogs/${id}`)
    .then(({data}) => {
      setBlog(data.data);
    })
  }, [id]);

  return (
    blog && (
      <div>
        <p>{blog.title}</p>
        <p>{blog.body}</p>
        <p>{blog.created_at}</p>
      </div>
    )
  );
}
