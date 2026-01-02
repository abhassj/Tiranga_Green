import React from 'react'
import { Link } from 'react-router-dom'

const AboutSection = () => {
  return (
    <div className='py-24 px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* TOP SECTION: HEADING & TEXT */}
        <div className='text-center mb-20'>
          <h3 className='text-green-600 font-extrabold uppercase tracking-[0.2em] text-xs mb-4'>Who are we?</h3>
          <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>
            Empowering India with <span className='text-green-600'>Green Energy</span>
          </h2>
          <p className='text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed'>
            We are a group of dedicated engineers and environmentalists driven by the single vision of accelerating the adoption of solar in Indian homes and businesses.
          </p>
        </div>

        {/* MIDDLE SECTION: BENTO IMAGE COLLAGE */}
        {/* We use a grid that mimics the "collage" feel of your reference image */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-20'>
          <div className='h-64 md:h-80 bg-gray-200 rounded-3xl overflow-hidden shadow-sm'>
            <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80" alt="Solar 1" className='w-full h-full object-cover hover:scale-110 transition-transform duration-500' />
          </div>
          <div className='h-64 md:h-80 mt-8 bg-gray-200 rounded-3xl overflow-hidden shadow-sm'>
            <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80" alt="Solar 2" className='w-full h-full object-cover hover:scale-110 transition-transform duration-500' />
          </div>
          <div className='h-64 md:h-80 bg-gray-200 rounded-3xl overflow-hidden shadow-sm'>
            <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80" alt="Solar 3" className='w-full h-full object-cover hover:scale-110 transition-transform duration-500' />
          </div>
          <div className='h-64 md:h-80 mt-8 bg-gray-200 rounded-3xl overflow-hidden shadow-sm'>
            <img src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Solar 4" className='w-full h-full object-cover hover:scale-110 transition-transform duration-500' />
          </div>
        </div>

        {/* BOTTOM SECTION: STATS CARDS (Mirroring the Reference Image) */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard number="4.9" label="Rating on Google" sublabel="with 500+ reviews" />
          <StatCard number="8+" label="Years of Experience" sublabel="in renewable energy" />
          <StatCard number="5,000+" label="Homes Solarised" sublabel="across the nation" />
          <StatCard number="₹20+ Cr" label="Saved by Customers" sublabel="on annual bills" />
        </div>

        <div className='mt-16 text-center'>
            <Link to='/projects' className='inline-flex items-center gap-2 px-10 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all shadow-xl shadow-green-200'>
                Learn More About Our Projects
            </Link>
        </div>
      </div>
    </div>
  )
}

// Reusable StatCard to keep the code clean
const StatCard = ({ number, label, sublabel }) => (
  <div className='bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:border-green-200 hover:bg-white hover:shadow-xl transition-all duration-300 group'>
    <h4 className='text-4xl font-black text-green-600 mb-2 group-hover:scale-110 transition-transform origin-left'>{number}</h4>
    <p className='text-gray-900 font-bold text-lg'>{label}</p>
    <p className='text-gray-500 text-sm mt-1'>{sublabel}</p>
  </div>
)

export default AboutSection