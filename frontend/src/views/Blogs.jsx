import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import axios from "axios";

export default function Blogs() {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
    .then(({data}) => {
      setCategories(data.data);
    })
    .catch((err) => {
      console.error(err)
    });

  }, []);

  return (
    <>
      <section className="mx-auto mt-10 max-w-screen-2xl flex flex-col md:grid md:grid-cols-[25%_75%]">
        <aside>
          <h1 className=" text-3xl mb-3 font-bold">Filters</h1>
          <h2 className="text-xl font-bold">Categories</h2>
          {
            categories.map(item => (
              <div key={item.id}>
                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setFilters(prevFilters => [...prevFilters, item.id])} /> {item.title}
              </div>
            ))
          }
        </aside>
        <BlogList filters={filters} />
      </section>
      <div id="paginations">
        Pagination Links
      </div>
    </>
  )
}
