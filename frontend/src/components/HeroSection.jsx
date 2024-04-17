import bannerImage from '../assets/banner.png'

export default function HeroSection() {
  return (
    <div className='grid md:grid-cols-2'>
        <div className='flex items-center justify-end order-2 md:order-1'>
            <div className='text-start p-4 md:p-0 space-y-4 md:w-[60%]'>
                <h1 className='font-bold text-6xl md:text-7xl'>Welcome to My Blog!</h1>
                <p>I am gonne be blogging my experince as an avatar!</p>
            </div>
        </div>
        <div className='flex items-center justify-start order-1 md:order-2'>
            <img src={bannerImage} alt="" className='filter drop-shadow-lg' />
        </div>
    </div>
  )
}
