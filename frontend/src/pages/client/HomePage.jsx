import { Link } from 'react-router-dom'
import homeBg from '../../assets/home-bg.avif'
import { IoCartOutline } from "react-icons/io5";
import HeroSec from './HeroSec';

const HomePage = () => {
    return (
        <>
            <main className='relative flex min-h-screen w-full items-center justify-center overflow-hidden py-16 sm:py-20'>
                <img
                    src={homeBg}
                    alt="Woman with luminous, healthy skin"
                    className="absolute inset-0 z-0 h-full w-full object-cover object-center" />
                <div className="absolute inset-0 z-10 bg-black/5">
                    <div className='flex flex-col justify-center h-full md:ml-50 gap-5 mx-2'>
                        <p className='text-gray-100/50 uppercase text-center md:text-left tracking-widest md:mb-4'>The science of feeling good in your skin</p>
                        <h1 className='text-text md:text-6xl text-5xl capitalize text-center md:text-left md:leading-18 leading-12'>Advanced care. <br /><span className='text-primary font-semibold'>Visible splendor.</span></h1>
                        <p className='text-white tracking-wider max-w-2xl md:leading-8 leading-7 text-center md:text-left text-[14px] md:text-[16px]'>Dermatologist-tested formulas engineered with powerful active ingredients to target your specific skin goals safely and effectively.</p>
                        <div className='flex items-center gap-7 flex-col md:flex-row'>
                            <Link to={'/products'} className='flex items-center text-[17px] w-full md:w-fit justify-center transition-all duration-300 active:scale-95 bg-primary px-7 py-2.5 text-white rounded-full gap-2 cursor-pointer'>
                                <span>Shop Now</span>
                                <IoCartOutline className='text-xl' />
                            </Link>
                            <div className='flex items-center gap-3'>
                                <Link to={'/about'} className='text-white cursor-pointer hover:underline'>About Splendor</Link>
                                <span className='w-12 h-0.5 bg-white'></span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <HeroSec />
        </>
    )
}

export default HomePage
