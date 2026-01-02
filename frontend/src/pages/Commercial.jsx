import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const Commercial = () => {
    const [formData, setFormData] = useState({
        name: '', companyName: '', whatsapp: '', city: '', pincode: '', bill: '', consent: false, email: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('http://localhost:5000/api/enquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    companyName: formData.companyName,
                    phone: formData.whatsapp,
                    whatsapp: formData.whatsapp,
                    email: formData.email,
                    city: formData.city,
                    pincode: formData.pincode,
                    avgMonthlyBill: formData.bill,
                    leadType: 'commercial',
                    source: 'commercial-page',
                    message: `Consent given: ${formData.consent ? 'Yes' : 'No'}`
                })
            });

            const data = await response.json();

            if (data.success) {
                setStatus({ type: 'success', message: "Thank you! We've received your enquiry. Our team will contact you shortly." });
                setFormData({ name: '', companyName: '', whatsapp: '', city: '', pincode: '', bill: '', consent: false, email: '' });
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
        <div className='min-h-screen bg-white font-sans text-gray-800 selection:bg-green-100'>
            
            {/* Hero Section */}
            <div className='relative w-full h-[75vh] min-h-[600px] bg-gray-900'>
                <img src={assets.commercial_hero} alt="Commercial Solar Installation" className='absolute inset-0 w-full h-full object-cover opacity-90' />
                <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent'></div>
                
                <div className='relative z-10 w-full h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-start pt-20 pb-32'>
                    <div className={`max-w-2xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <span className='inline-block py-1 px-3 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-sm'>
                            Premium Solar Solutions
                        </span>
                        <h1 className='text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight'>
                            Powering India’s <br/> Leading <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300'>Businesses</span>
                        </h1>
                        <p className='text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-lg'>
                            Reduce operational costs by up to 80% and achieve your sustainability goals with our customized, high-efficiency solar systems.
                        </p>
                        <button onClick={() => document.getElementById('enquiry-form').scrollIntoView({behavior: 'smooth'})} className='group relative inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/50 hover:shadow-green-500/30'>
                            Get a Commercial Quote
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Form + Value Prop Section */}
            <div className='relative z-20 -mt-24 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
                        
                        {/* Left Card: Value Proposition */}
                        <div className={`lg:col-span-5 bg-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/10 border border-gray-100 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <h2 className='text-2xl font-bold text-gray-900 mb-8'>Why Switch to Commercial?</h2>
                            <div className='space-y-8'>
                                {[
                                    { icon: "💰", title: "Accelerated Depreciation", desc: "Claim 40% depreciation in Year 1." },
                                    { icon: "⚡", title: "Reduce Fixed Costs", desc: "Cut electricity bills significantly." },
                                    { icon: "🌱", title: "ESG Compliance", desc: "Meet corporate sustainability goals." },
                                    { icon: "🛠️", title: "Reliable Power & O&M", desc: "25-year performance warranty." }
                                ].map((item, i) => (
                                    <div key={i} className='flex gap-5 group'>
                                        <div className='w-12 h-12 rounded-2xl bg-green-50 text-2xl flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors'>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-gray-900 text-lg mb-1'>{item.title}</h3>
                                            <p className='text-sm text-gray-500 font-medium leading-relaxed'>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Card: Enquiry Form */}
                        <div id='enquiry-form' className={`lg:col-span-7 bg-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-green-900/5 border border-gray-100 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <div className='mb-8'>
                                <h2 className='text-2xl font-bold text-gray-900'>Get Your Custom Proposal</h2>
                                <p className='text-gray-500 mt-2'>Fill in the details below for a comprehensive solar assessment.</p>
                            </div>

                            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-gray-400 uppercase tracking-wider ml-1'>Full Name</label>
                                    <input 
                                        type="text" name="name" required 
                                        className='w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium text-gray-900 placeholder:text-gray-400' 
                                        placeholder='Ex. Rajesh Verma' 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-gray-400 uppercase tracking-wider ml-1'>Company Name</label>
                                    <input 
                                        type="text" name="companyName" required 
                                        className='w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium text-gray-900 placeholder:text-gray-400' 
                                        placeholder='Ex. Solar Tech Pvt Ltd' 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-gray-400 uppercase tracking-wider ml-1'>WhatsApp Number</label>
                                    <input 
                                        type="tel" name="whatsapp" required 
                                        className='w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium text-gray-900 placeholder:text-gray-400' 
                                        placeholder='+91 98765 43210' 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-gray-400 uppercase tracking-wider ml-1'>Email Address</label>
                                    <input 
                                        type="email" name="email" required 
                                        className='w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium text-gray-900 placeholder:text-gray-400' 
                                        placeholder='Ex. contact@solartech.com' 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-gray-400 uppercase tracking-wider ml-1'>City</label>
                                    <input 
                                        type="text" name="city" required 
                                        className='w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium text-gray-900 placeholder:text-gray-400' 
                                        placeholder='Ex. Pune' 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-gray-400 uppercase tracking-wider ml-1'>Pincode</label>
                                    <input 
                                        type="number" name="pincode" required 
                                        className='w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium text-gray-900 placeholder:text-gray-400' 
                                        placeholder='Ex. 411001' 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-xs font-bold text-gray-400 uppercase tracking-wider ml-1'>Avg Monthly Bill</label>
                                    <select 
                                        name="bill" required 
                                        className='w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium text-gray-900' 
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Range</option>
                                        <option value="50k-1L">₹50,000 - ₹1 Lakh</option>
                                        <option value="1L-5L">₹1 Lakh - ₹5 Lakhs</option>
                                        <option value="5L+">₹5 Lakhs+</option>
                                    </select>
                                </div>

                                <div className='md:col-span-2 pt-2'>
                                    <label className='flex items-start gap-3 cursor-pointer group'>
                                        <input type="checkbox" name="consent" required className='mt-1 w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500' onChange={handleChange} />
                                        <span className='text-sm text-gray-500 group-hover:text-gray-700 transition-colors'>
                                            I authorize Tiranga Green to contact me via WhatsApp/Phone for this enquiry.
                                        </span>
                                    </label>
                                </div>

                                <div className='md:col-span-2 pt-4'>
                                    <button type='submit' disabled={loading} className='w-full py-5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl text-lg tracking-wide uppercase disabled:opacity-70'>
                                        {loading ? 'Submitting...' : 'Submit Request'}
                                    </button>
                                    {status.message && (
                                        <div className={`mt-4 p-4 rounded-lg text-center font-medium ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {status.message}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            {/* Comprehensive Services */}
            <div className='py-24 bg-gradient-to-br from-green-800 to-green-600 mt-20 relative overflow-hidden'>
                <div className='absolute inset-0 bg-[url("/pattern.png")] opacity-10 mix-blend-overlay'></div>
                <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
                    <h2 className='text-3xl font-bold text-center text-white mb-16'>Comprehensive Solar Services</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {[
                            { icon: "📉", title: "Lower Costs", desc: "Reduce electricity expenses by up to 80%." },
                            { icon: "⏱️", title: "3-4 Year Payback", desc: "Quick ROI with tax depreciation benefits." },
                            { icon: "🛠️", title: "Expert O&M", desc: "25 years of performance warranty support." },
                            { icon: "🤝", title: "Dedicated Support", desc: "Priority service for commercial clients." }
                        ].map((item, index) => (
                            <div key={index} className='bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 text-center group'>
                                <div className='text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500'>{item.icon}</div>
                                <h3 className='text-xl font-bold text-white group-hover:text-gray-900 mb-3 transition-colors'>{item.title}</h3>
                                <p className='text-gray-200 text-sm leading-relaxed group-hover:text-gray-500 transition-colors'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className='py-24 bg-white'>
                <div className='max-w-7xl mx-auto px-6 lg:px-8'>
                    <h2 className='text-3xl font-bold text-center text-gray-900 mb-16'>Trusted by Industry Leaders</h2>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{ delay: 5000 }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                        }}
                        className='pb-12'
                    >
                        {[
                            { quote: "Tiranga Green transformed our energy consumption. The execution was flawless, and we started saving from day one.", name: "Rajesh Kumar", role: "MD, TechNova Industries", initial: "R" },
                            { quote: "Best investment for our manufacturing plant. Their O&M team is incredibly responsive and professional.", name: "Sunita Gupta", role: "Director, Gupta Logistics", initial: "S" },
                            { quote: "We recovered our investment in under 4 years. Highly recommend their commercial solutions.", name: "Amit Shah", role: "CEO, Shah Exports", initial: "A" }
                        ].map((t, i) => (
                            <SwiperSlide key={i}>
                                <div className='bg-gray-50 p-10 rounded-3xl border border-gray-100 relative mx-2 h-full'>
                                    <div className='text-6xl text-green-200 font-serif absolute top-8 left-8'>"</div>
                                    <p className='text-lg text-gray-600 relative z-10 italic mb-8 leading-relaxed pl-6 pt-4'>
                                        {t.quote}
                                    </p>
                                    <div className='flex items-center gap-4 pl-6'>
                                        <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 text-lg'>
                                            {t.initial}
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-gray-900'>{t.name}</h4>
                                            <p className='text-xs text-gray-500 font-semibold uppercase tracking-wider'>{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Project Highlight & Stats */}
            <div className='py-16 bg-gray-900 text-white overflow-hidden'>
                <div className='max-w-7xl mx-auto px-6 lg:px-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                        <div className='relative'>
                            <div className='absolute -inset-4 bg-green-500/20 rounded-3xl blur-2xl'></div>
                            <img src={assets.project_commercial} alt="Featured Project" className='relative rounded-2xl shadow-2xl border border-white/10 w-full hover:scale-[1.02] transition-transform duration-500' />
                            <div className='absolute -bottom-6 -right-6 bg-white text-gray-900 p-6 rounded-2xl shadow-xl max-w-xs hidden md:block'>
                                <p className='font-bold text-lg mb-2'>Featured Install</p>
                                <ul className='text-sm space-y-1 text-gray-600 font-medium'>
                                    <li>• 100kW Rooftop System</li>
                                    <li>• 60% Bill Reduction</li>
                                    <li>• 3.2 Year Payback</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <span className='text-green-400 font-bold tracking-wider uppercase text-sm mb-4 block'>Impact at Scale</span>
                            <h2 className='text-3xl md:text-5xl font-bold mb-8 leading-tight'>Driving the Green Revolution</h2>
                            <p className='text-gray-400 text-lg mb-12 leading-relaxed'>
                                Join hundreds of forward-thinking businesses that have already made the switch. Our systems are engineered for maximum yield and longevity.
                            </p>
                            
                            <div className='grid grid-cols-3 gap-8 border-t border-white/10 pt-8'>
                                <div>
                                    <div className='text-4xl font-bold text-white mb-1'>50+</div>
                                    <div className='text-xs text-gray-500 uppercase tracking-wider'>MW Installed</div>
                                </div>
                                <div>
                                    <div className='text-4xl font-bold text-white mb-1'>40%</div>
                                    <div className='text-xs text-gray-500 uppercase tracking-wider'>ROI Year 1</div>
                                </div>
                                <div>
                                    <div className='text-4xl font-bold text-white mb-1'>20+</div>
                                    <div className='text-xs text-gray-500 uppercase tracking-wider'>Cities</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA Band */}
            <div className='py-20 bg-green-800 relative overflow-hidden'>
                <div className='absolute inset-0 bg-[url("/pattern.png")] opacity-10 mix-blend-overlay'></div>
                <div className='relative z-10 max-w-4xl mx-auto text-center px-4'>
                    <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'>Ready to Power Your Business?</h2>
                    <p className='text-green-100 text-xl mb-10'>Get a free site survey and detailed technical proposal today.</p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <button 
                            onClick={() => document.getElementById('enquiry-form').scrollIntoView({behavior: 'smooth'})}
                            className='bg-white text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl'
                        >
                            Schedule a Call
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Commercial
