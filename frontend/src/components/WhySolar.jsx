import React from 'react'

const WhySolar = () => {
  return (
    <div>
        {/* 1. The "Why Tiranga Green" Feature Grid */}
        <div className='pt-8 pb-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white'>
            <div className='text-center mb-16'>
                <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Why Choose Tiranga Green?</h2>
                <div className='w-24 h-1 bg-green-500 mx-auto rounded-full'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {/* Feature 1 */}
                <div className='bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 group'>
                    <div className='w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                            {/* Solar Panel Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className='text-xl font-bold text-gray-800 mb-3'>Premium Grade Modules</h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>Only Tier-1 panels for maximum power generation and durability.</p>
                </div>

                {/* Feature 2 */}
                <div className='bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 group'>
                    <div className='w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                        {/* Shield Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h3 className='text-xl font-bold text-gray-800 mb-3'>Zero-Leakage Guarantee</h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>Advanced rooftop anchoring technology to protect your home structure.</p>
                </div>

                {/* Feature 3 */}
                <div className='bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 group'>
                    <div className='w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                        {/* Document/Subsidy Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className='text-xl font-bold text-gray-800 mb-3'>End-to-End Subsidy Support</h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>We handle all the government paperwork for you seamlessly.</p>
                </div>

                {/* Feature 4 */}
                <div className='bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 group'>
                    <div className='w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                            {/* Tools Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className='text-xl font-bold text-gray-800 mb-3'>Lifetime Support</h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>Professional maintenance to keep your system at peak performance.</p>
                </div>
            </div>
        </div>

        {/* 2. The "3-Step Journey" Separator */}
        <div className='bg-green-900 py-12 px-4 text-center'>
                <div className='max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4'>
                
                {/* Step 1 */}
                <div className='flex items-center gap-4 text-white/90'>
                    <div className='w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center text-xl font-bold bg-white/10'>1</div>
                    <div className='text-left'>
                        <h4 className='font-bold text-lg text-white'>Enquire</h4>
                        <p className='text-xs text-green-200'>Share your requirements</p>
                    </div>
                </div>

                {/* Arrow */}
                <div className='hidden md:block text-green-500 text-2xl'>&rarr;</div>

                {/* Step 2 */}
                <div className='flex items-center gap-4 text-white/90'>
                    <div className='w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center text-xl font-bold bg-white/10'>2</div>
                    <div className='text-left'>
                        <h4 className='font-bold text-lg text-white'>Consult</h4>
                        <p className='text-xs text-green-200'>Get free 3D solar design</p>
                    </div>
                </div>

                    {/* Arrow */}
                <div className='hidden md:block text-green-500 text-2xl'>&rarr;</div>

                {/* Step 3 */}
                <div className='flex items-center gap-4 text-white/90'>
                        <div className='w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center text-xl font-bold bg-white/10'>3</div>
                    <div className='text-left'>
                        <h4 className='font-bold text-lg text-white'>Save</h4>
                        <p className='text-xs text-green-200'>Install & reduce bills</p>
                    </div>
                </div>

                </div>
        </div>

        {/* 3. The "Impact & Savings" Calculator Bar */}
        <div className='bg-green-50 py-12 border-b border-gray-100'>
            <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-green-200'>
                
                {/* Savings */}
                <div className='text-center px-4'>
                        <p className='text-green-600 font-semibold uppercase tracking-wider text-xs mb-2'>Potential Savings</p>
                        <h3 className='text-3xl sm:text-4xl font-extrabold text-gray-800'>₹10,00,000+</h3>
                        <p className='text-gray-500 text-sm mt-1'>Over 25 years</p>
                </div>

                    {/* Carbon Offset */}
                    <div className='text-center px-4 pt-8 md:pt-0'>
                        <p className='text-green-600 font-semibold uppercase tracking-wider text-xs mb-2'>Carbon Offset</p>
                        <h3 className='text-3xl sm:text-4xl font-extrabold text-gray-800'>500+</h3>
                        <p className='text-gray-500 text-sm mt-1'>Trees planted equivalents</p>
                </div>

                    {/* Property Value */}
                    <div className='text-center px-4 pt-8 md:pt-0'>
                        <p className='text-green-600 font-semibold uppercase tracking-wider text-xs mb-2'>Property Value</p>
                        <h3 className='text-3xl sm:text-4xl font-extrabold text-gray-800'>Up to 4%</h3>
                        <p className='text-gray-500 text-sm mt-1'>Boost in resale value</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default WhySolar
