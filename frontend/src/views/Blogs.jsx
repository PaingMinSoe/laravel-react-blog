import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import axios from "axios";

export default function Blogs() {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
    .then(({data}) => {
      setCategories(data);
    })
    .catch((err) => {
      console.error(err)
    });

  }, []);

  const filter = (e, id) => {
    if (e.target.checked) {
      setFilters(prevFilters => [...prevFilters, id]);
    } else {
      setFilters(prevFilters => prevFilters.filter(item => item !== id));
    }
  }

  return (
    <>
      <section className="mx-auto mt-10 max-w-screen-2xl flex flex-col md:grid md:grid-cols-[25%_75%]">
        <aside className="mx-10">
          <h1 className=" text-3xl font-bold">Filters</h1>
          <div className="p-3">
            <h2 className="text-xl font-bold">Categories</h2>
            {
              categories.map(item => (
                <div key={item.id} className="flex items-center mb-2">
                  <input id={item.title} type="checkbox"  onChange={(e) => filter(e, item.id)} />
                  <label htmlFor={item.title} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.title}</label>
                </div>
              ))
            }
          </div>
        </aside>
        <div className="w-full min-h-[calc(100vh-160px)]">          
          <BlogList filters={filters} />
        </div>
      </section>
    </>
  )
}
