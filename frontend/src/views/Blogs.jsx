import BlogList from "../components/BlogList";

export default function Blogs() {
  return (
    <>
      <section className="mx-auto mt-10 max-w-screen-2xl flex flex-col md:grid md:grid-cols-[25%_75%]">
        <aside>
          Filters
        </aside>
        <BlogList />
      </section>
      <div id="paginations">
        Pagination Links
      </div>
    </>
  )
}
