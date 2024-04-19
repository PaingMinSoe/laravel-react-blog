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
        <aside className="mx-10">
          <h1 className=" text-3xl font-bold">Filters</h1>
          <div className="p-3">
            <h2 className="text-xl font-bold">Categories</h2>
            {
              categories.map(item => (
                <div key={item.id}>
                  <input id={item.title} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setFilters(prevFilters => [...prevFilters, item.id])} />
                  <label htmlFor={item.title} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.title}</label>
                </div>
              ))
            }
          </div>
        </aside>
        <BlogList filters={filters} />
      </section>
      <div id="paginations">
        Pagination Links
      </div>
    </>
  )
}
