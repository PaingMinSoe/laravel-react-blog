import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DummyImage from '../assets/aang-redirects-lightning.jpeg';
import { axiosClient } from '../services/axiosClient';

export default function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axiosClient.get(`/blogs/${id}`)
    .then(({data}) => {
      setBlog(data.data);
    })
  }, [id]);

  return (
    blog && (
      <div className='w-full p-10 flex flex-col items-center'>
        <button className='me-auto flex gap-2.5 justify-center items-center text-lg hover:text-gray-400 transition-colors duration-100' onClick={() => history.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
        <img src={DummyImage} className='w-[40%] rounded shadow-lg mb-8' alt="" />
        <div className='w-full flex flex-col items-start'>
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
