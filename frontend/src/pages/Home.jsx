import React from 'react'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'
import BlogSlider from '../components/BlogSlider'
import WhySolar from '../components/WhySolar'
import AboutSection from '../components/AboutSection'
import { assets } from '../assets/assets'

const Home = () => {
    return (
        <div>
            <Hero />
            
            {/* Separator Section */}
            {/* Separator Section: Savings-First Approach */}
            {/* 1. The "Why Tiranga Green" Feature Grid */}
            {/* Separator Section: Savings-First Approach */}
            <div className='bg-gray-50 py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] text-center border-b border-gray-100'>
                 <span className='inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-4 tracking-wider uppercase'>
                    The "Savings-First" Approach
                 </span>
                 <h2 className='text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4'>
                    Your Roof, Your Energy, <span className='text-green-600'>Zero Bills.</span>
                 </h2>
                 <p className='text-gray-600 max-w-2xl mx-auto text-lg mb-10 leading-relaxed'>
                    Switch to Tiranga Green and lock in your electricity costs for the next 25 years. 
                    <span className='hidden sm:inline'> Start saving from day one with our efficient solutions.</span>
                 </p>

                 {/* Key Stats */}
                 <div className='flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 md:gap-20'>
                    
                    {/* Stat 1 */}
                    <div className='flex flex-col items-center gap-2 group'>
                        <div className='w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300'>
                            <p className='text-2xl font-bold text-gray-800'>₹0</p>
                        </div>
                        <p className='font-semibold text-gray-700'>Monthly Electricity Bill</p>
                    </div>

                    {/* Stat 2 */}
                    <div className='flex flex-col items-center gap-2 group'>
                        <div className='w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300'>
                            <img src={assets.quality_icon} alt="Warranty" className='w-6 h-6 opacity-70' />
                        </div>
                        <p className='font-semibold text-gray-700'>25 Years Warranty</p>
                    </div>

                    {/* Stat 3 */}
                    <div className='flex flex-col items-center gap-2 group'>
                        <div className='w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300'>
                            <img src={assets.exchange_icon} alt="Subsidy" className='w-6 h-6 opacity-70' />
                        </div>
                        <p className='font-semibold text-gray-700'>40% Govt. Subsidy</p>
                    </div>

                 </div>
            </div>

            <ContactForm />
            <BlogSlider />
            <WhySolar />
            <AboutSection />
        </div>
    )
}

export default Home