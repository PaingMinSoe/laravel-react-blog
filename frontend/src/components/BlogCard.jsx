import { Link } from 'react-router-dom';
import DummyImage from '../assets/aang-redirects-lightning.jpeg';

export default function BlogCard({item}) {
  return (
    <Link to={`/blogs/${item.id}`} className='flex flex-col border border-gray-700 m-5 md:m-0 rounded-lg shadow-lg overflow-hidden' key={item.id}>
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
  )
}
