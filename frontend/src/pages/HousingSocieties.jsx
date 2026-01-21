import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const HousingSocieties = () => {
    const [formData, setFormData] = useState({
        name: '', societyName: '', whatsapp: '', pincode: '', bill: '', education: false, role: '', email: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/enquiries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    companyName: formData.societyName,
                    phone: formData.whatsapp,
                    whatsapp: formData.whatsapp,
                    email: formData.email,
                    pincode: formData.pincode,
                    avgMonthlyBill: formData.bill,
                    leadType: 'housing_society',
                    source: 'housing-society-page',
                    message: `Role: ${formData.role}`
                })
            });

            const data = await response.json();

            if (data.success) {
                setStatus({ type: 'success', message: "Thanks! Our community expert will call you shortly." });
                setFormData({ name: '', societyName: '', whatsapp: '', pincode: '', bill: '', education: false, role: '', email: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to connect to server.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-[#F8FAFC] font-sans'>
            
            {/* Split Hero Section */}
            <div className='relative bg-gradient-to-b from-slate-900 to-green-900'>
                
                <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                        
                        {/* Left: Image Slider */}
                        <div className={`w-full transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Swiper
                                modules={[Autoplay, Pagination, EffectFade]}
                                effect={'fade'}
                                loop={true}
                                autoplay={{ delay: 3000 }}
                                pagination={{ clickable: true }}
                                className='w-full h-[400px] md:h-[500px] rounded-2xl shadow-2xl overflow-hidden border-4 border-white/10'
                            >
                                {[assets.housing_slider_1, assets.housing_slider_2, assets.housing_slider_3].map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <div className='relative w-full h-full'>
                                            <img src={img} alt={`Housing Society ${i+1}`} className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-[5s] ease-linear' />
                                            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6'>
                                                <p className='text-white font-medium'>Trusted by 50+ Premium Societies</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className='mt-8 text-white/90 hidden lg:block'>
                                <h1 className='text-4xl font-bold mb-4'>Empowering Communities with Clean Energy</h1>
                                <p className='text-lg text-gray-300'>Offset common area electricity costs by up to 90%. Enhance your society's value and sustainability.</p>
                            </div>
                        </div>

                        {/* Right: Enquiry Form */}
                        <div id='society-form' className={`bg-white rounded-2xl shadow-2xl p-6 md:p-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Request Society Visit</h2>
                            <p className='text-gray-500 mb-6 text-sm'>Expert consultation for managing committees.</p>

                            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-bold text-gray-600 uppercase'>Your Full Name</label>
                                    <input type="text" name="name" required className='p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50' placeholder='Rahul Verma' onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-bold text-gray-600 uppercase'>Housing Society Name</label>
                                    <input type="text" name="societyName" required className='p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50' placeholder='Green Heights CHS' onChange={handleChange} />
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-xs font-bold text-gray-600 uppercase'>Pincode</label>
                                        <input type="number" name="pincode" required className='p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50' placeholder='411057' onChange={handleChange} />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label className='text-xs font-bold text-gray-600 uppercase'>WhatsApp</label>
                                        <input type="tel" name="whatsapp" required className='p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50' placeholder='9876543210' onChange={handleChange} />
                                    </div>
                                    <div className='flex flex-col gap-1 col-span-2'>
                                        <label className='text-xs font-bold text-gray-600 uppercase'>Email Address</label>
                                        <input type="email" name="email" required className='p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50' placeholder='secretary@greenheights.com' onChange={handleChange} />
                                    </div>
                                </div>
                                
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-bold text-gray-600 uppercase'>Society Monthly Bill (Approx)</label>
                                    <select name="bill" required className='p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50' onChange={handleChange}>
                                        <option value="">Select Range</option>
                                        <option value="50k-1L">₹50,000 - ₹1 Lakh</option>
                                        <option value="1L-3L">₹1 Lakh - ₹3 Lakhs</option>
                                        <option value="3L+">₹3 Lakhs+</option>
                                    </select>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs font-bold text-gray-600 uppercase'>Your Role</label>
                                    <div className='flex gap-2 flex-wrap'>
                                        {['Chairman', 'Secretary', 'Committee Member', 'Resident'].map(r => (
                                            <button 
                                                key={r}
                                                type='button'
                                                onClick={() => setFormData({...formData, role: r})}
                                                className={`px-3 py-1 rounded-full text-xs border ${formData.role === r ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button type='submit' disabled={loading} className='mt-2 w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 disabled:opacity-70'>
                                    {loading ? 'Checking...' : 'Check Feasibility Now'}
                                </button>
                                {status.message && (
                                    <div className={`mt-2 p-3 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {status.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Solar Block */}
            <div className='max-w-7xl mx-auto px-4 py-16'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-gray-800'>Why Solar for Housing Societies?</h2>
                    <div className='w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full'></div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300'>
                         <div className='text-4xl mb-4'>🏢</div>
                         <h3 className='text-xl font-bold text-gray-800 mb-2'>Zero Common Bills</h3>
                         <p className='text-gray-600'>Power lifts, pumps, and lobby lights with free solar energy. Reduce maintenance charges for residents.</p>
                    </div>
                    <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300'>
                         <div className='text-4xl mb-4'>🔋</div>
                         <h3 className='text-xl font-bold text-gray-800 mb-2'>Reliable Backup</h3>
                         <p className='text-gray-600'>Integrate with battery storage or diesel generators to ensure 24/7 power during outages.</p>
                    </div>
                    <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300'>
                         <div className='text-4xl mb-4'>🌿</div>
                         <h3 className='text-xl font-bold text-gray-800 mb-2'>Green Community</h3>
                         <p className='text-gray-600'>Boost property value and contribute to a cleaner environment. Become a certified Green Society.</p>
                    </div>
                </div>
            </div>

            {/* Statistics Band */}
            <div className='bg-green-600 py-16 text-white'>
                <div className='max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
                    <div>
                        <div className='text-4xl font-bold mb-2'>50+</div>
                        <div className='text-sm uppercase tracking-wider opacity-80'>Societies Enabled</div>
                    </div>
                    <div>
                        <div className='text-4xl font-bold mb-2'>2.5MW</div>
                        <div className='text-sm uppercase tracking-wider opacity-80'>Power Installed</div>
                    </div>
                    <div>
                        <div className='text-4xl font-bold mb-2'>10k+</div>
                        <div className='text-sm uppercase tracking-wider opacity-80'>Residents Impacted</div>
                    </div>
                     <div>
                        <div className='text-4xl font-bold mb-2'>₹5Cr+</div>
                        <div className='text-sm uppercase tracking-wider opacity-80'>Annual Savings</div>
                    </div>
                </div>
            </div>

             {/* Map Section */}
             <div className='py-20 bg-white'>
                  <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12'>
                      {/* Left: Map Image */}
                      <div className='w-full md:w-1/2 flex justify-center'>
                          <div className='relative w-full max-w-md'>
                              <div className='absolute inset-0 bg-green-50 rounded-full blur-3xl opacity-30'></div>
                              <img src={assets.service_map_green} alt="Service Map" className='relative z-10 w-full object-contain hover:scale-105 transition-transform duration-700' />
                          </div>
                      </div>

                      {/* Right: Content */}
                      <div className='w-full md:w-1/2 text-center md:text-left'>
                          <h2 className='text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6'>
                              We are in <span className='text-green-600'>20+ Cities</span> <br/> across Maharashtra!
                          </h2>
                          <p className='text-lg text-gray-500 mb-8 max-w-lg mx-auto md:mx-0'>
                              From bustling metropolises like Mumbai and Pune to growing hubs like Nagpur and Nashik, we are transforming skylines with sustainable energy.
                          </p>
                          
                          <div className='flex flex-wrap gap-4 justify-center md:justify-start'>
                              {['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'].map((city) => (
                                  <span key={city} className='px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold border border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all cursor-default'>
                                     📍 {city}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </div>
             </div>

             {/* Final CTA */}
             <div className='bg-gray-900 py-12 text-center text-white'>
                 <h2 className='text-2xl font-bold mb-4'>Ready to transform your society?</h2>
                 <p className='mb-8 text-gray-400'>Join the solar revolution today.</p>
                 <button onClick={() => document.getElementById('society-form').scrollIntoView({ behavior: 'smooth' })} className='bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors'>
                     Contact Us
                 </button>
             </div>
        </div>
    )
}

export default HousingSocieties
