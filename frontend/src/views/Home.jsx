import HeroSection from '../components/HeroSection'
import BlogList from '../components/BlogList'

export default function Home() {
    return (
        <>
            <HeroSection />
            <section className='mx-auto max-w-7xl mt-20 space-y-10'>
                <h1 className='text-center text-3xl font-bold'>Latest Blogs</h1>
                <BlogList homepage />     
            </section>
        </>
    )
}
