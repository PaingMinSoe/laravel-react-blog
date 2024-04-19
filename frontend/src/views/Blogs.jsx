import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import axios from "axios";

export default function Blogs() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
    .then(({data}) => {
      setCategories(data.data);
    })
    .catch((err) => {
      console.error(err)
    })
  }, []);
  console.log(categories);
  return (
    <>
      <section className="mx-auto mt-10 max-w-screen-2xl flex flex-col md:grid md:grid-cols-[25%_75%]">
        <aside>
          <h1 className="text-xl font-bold">Categories</h1>
          {
            categories.map(item => (
              <div key={item.id}>{`${item.id} ${item.title}`}</div>
            ))
          }
        </aside>
        <BlogList />
      </section>
      <div id="paginations">
        Pagination Links
      </div>
    </>
  )
}
