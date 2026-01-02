import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-[#F0FDF4] border-t border-green-100'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] text-sm'>

        <div>
           {/* Logo and About */}
          <img className='mb-5 w-32' src={assets.logo} alt="Tiranga Green Energy Solutions" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Building brand trust and educating customers about Tiranga Green Energy Solutions‘s solar solutions. 
            We provide top-notch off-grid and on-grid solar systems.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-green-700'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <Link to='/' className='hover:text-green-600 cursor-pointer'>Home</Link>
            <Link to='/services' className='hover:text-green-600 cursor-pointer'>Our Services</Link>
            <Link to='/products' className='hover:text-green-600 cursor-pointer'>Our Products</Link>
            <Link to='/projects' className='hover:text-green-600 cursor-pointer'>Projects</Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-green-700'>LEGAL</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
             <Link to='/legal' className='hover:text-green-600 cursor-pointer'>Privacy Policy</Link>
             <Link to='/terms-conditions' className='hover:text-green-600 cursor-pointer'>Terms & Conditions</Link>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-500'>Copyright 2025 @ Tiranga Green Energy Solutions - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
