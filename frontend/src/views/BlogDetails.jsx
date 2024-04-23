import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DummyImage from '../assets/aang-redirects-lightning.jpeg';

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
      <div className='w-full p-10 flex flex-col items-center'>
        <img src={DummyImage} className='w-[40%] rounded shadow-md mb-10' alt="" />
        <div>
          <div className='mb-3'>
            <h1 className='text-4xl font-bold mb-3'>{blog.title}</h1>
            <p className='text-gray-500'>{blog.created_at}</p>
            <p>Authored By <span className='text-gray-500'>{blog.author}</span></p>
          </div>
          <p>{blog.body}</p>
        </div>
      </div>
    )
  );
}
