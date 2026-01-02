import React, { useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

// Reusable component for scroll animations
const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset to trigger before bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ServiceSection = ({ title, isActive, onClick, children }) => {
  return (
    <div className={`border rounded-xl mb-6 overflow-hidden transition-all duration-300 ${isActive ? 'border-green-500 shadow-lg' : 'border-gray-200'}`}>
      <div 
        className={`p-6 cursor-pointer flex justify-between items-center ${isActive ? 'bg-green-50' : 'bg-white hover:bg-gray-50'}`}
        onClick={onClick}
      >
        <h3 className='text-2xl font-bold text-gray-800'>{title}</h3>
        <span className={`text-2xl transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      <div className={`transition-all duration-500 ease-in-out ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className='p-6 bg-white border-t border-gray-100'>
          {children}
        </div>
      </div>
    </div>
  )
}

const OurServices = () => {
    const [activeService, setActiveService] = useState('off-grid');
    const navigate = useNavigate();

    const handleContactClick = () => {
        navigate("/");
        setTimeout(() => {
            const element = document.getElementById("contact");
            if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

  return (
    <div className='bg-gray-50 min-h-screen'>
      
      {/* Hero Banner Section */}
      <div className='relative w-full h-[400px] mb-12'>
        <img 
            src={assets.services_hero} 
            alt="Solar Services" 
            className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4'>
            <ScrollReveal>
                <h1 className='text-4xl md:text-6xl font-bold text-white uppercase tracking-wider mb-4 drop-shadow-lg'>Our Solar Services</h1>
            </ScrollReveal>
             <ScrollReveal delay={200}>
                <div className='w-24 h-1.5 bg-green-500 rounded-full mb-6 mx-auto'></div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
                <p className='text-green-50 max-w-2xl text-lg md:text-xl font-medium drop-shadow-md mx-auto'>
                    Tailored solar solutions for homes, businesses, and industries.
                </p>
            </ScrollReveal>
        </div>
      </div>

      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pb-16'>

      <div className='flex justify-center gap-4 mb-12'>
        <button 
            onClick={() => setActiveService('off-grid')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${activeService === 'off-grid' ? 'bg-green-600 text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
            Off-Grid Solar
        </button>
        <button 
            onClick={() => setActiveService('on-grid')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${activeService === 'on-grid' ? 'bg-green-600 text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
            On-Grid Solar
        </button>
      </div>

      {activeService === 'off-grid' && (
          <div className='transition-opacity duration-500'>
              <ScrollReveal>
                  <div className='bg-white rounded-2xl p-8 shadow-sm mb-8'>
                      <h2 className='text-3xl font-bold text-green-700 mb-6'>Off-Grid Solar Systems</h2>
                      <div className='text-gray-700 mb-8 space-y-4 text-lg'>
                          <p>
                              An off-grid solar system, also known as a standalone solar system, works on the same principle as an on-grid solar system: the PV cells capture the sunlight and convert it to electricity. However, the major difference is that there’s no grid connection. Instead, it uses batteries to store the electricity generated by the panels during sunshine hours.
                          </p>
                          <p>
                              The off-grid solar system price in India is generally higher than on-grid systems due to the cost of batteries. Maintenance also requires more effort as batteries need periodic replacement.
                          </p>
                          <div className='bg-green-50 p-6 rounded-xl border border-green-100 mt-4'>
                              <p className='font-bold text-green-900 mb-3'>Estimated Costs (Standard Market Rates):</p>
                              <ul className='space-y-2'>
                                  <li className='flex justify-between border-b border-green-200 pb-2 last:border-0 last:pb-0'>
                                      <span>3 kW Off-Grid System</span>
                                      <span className='font-bold text-gray-900'>₹2,40,000 onwards</span>
                                  </li>
                                  <li className='flex justify-between border-b border-green-200 pb-2 last:border-0 last:pb-0'>
                                      <span>5 kW Off-Grid System</span>
                                      <span className='font-bold text-gray-900'>₹4,50,000 onwards</span>
                                  </li>
                              </ul>
                              <p className='text-xs text-gray-500 mt-3 italic'>*Prices are standard market estimates and subject to change.</p>
                          </div>
                      </div>
                      
                      <ScrollReveal>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                            <div>
                                <h3 className='text-xl font-bold mb-4 text-gray-800'>How It Works</h3>
                                <img src={assets.offgrid_diagram} alt="Off-Grid Solar System Diagram" className='w-full rounded-xl shadow-md mb-6' />
                                <ul className='list-disc pl-5 space-y-2 text-gray-600'>
                                    <li>Solar panels convert sunlight into DC electricity.</li>
                                    <li>Charge controller regulates voltage to charge batteries.</li>
                                    <li>Batteries store the energy for later use.</li>
                                    <li>Inverter converts DC from batteries to AC for appliances.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className='text-xl font-bold mb-4 text-gray-800'>When to Use</h3>
                                <ul className='list-disc pl-5 space-y-2 text-gray-600'>
                                    <li>In remote areas with no grid access.</li>
                                    <li>If you want complete energy independence.</li>
                                    <li>Where grid power is unreliable or expensive.</li>
                                </ul>
                            </div>
                        </div>
                      </ScrollReveal>

                      <ScrollReveal delay={200}>
                        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='p-6 bg-green-50 rounded-xl border border-green-100'>
                                <h3 className='text-lg font-bold text-green-800 mb-3'>Advantages</h3>
                                <ul className='list-disc pl-5 space-y-1 text-gray-600 text-sm'>
                                    <li>100% Energy Independence</li>
                                    <li>No electricity bills</li>
                                    <li>Reliable power during grid outages</li>
                                    <li>Sustainable and eco-friendly</li>
                                </ul>
                            </div>
                            <div className='p-6 bg-red-50 rounded-xl border border-red-100'>
                                <h3 className='text-lg font-bold text-red-800 mb-3'>Disadvantages</h3>
                                <ul className='list-disc pl-5 space-y-1 text-gray-600 text-sm'>
                                    <li>Higher initial cost due to batteries</li>
                                    <li>Batteries require maintenance & replacement</li>
                                    <li>Energy supply limited to battery capacity</li>
                                </ul>
                            </div>
                        </div>
                      </ScrollReveal>

                      <ScrollReveal delay={300}>
                        <div className='mt-12'>
                            <h3 className='text-xl font-bold mb-6 text-gray-800'>Frequently Asked Questions</h3>
                            <div className='space-y-4'>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: Is there a subsidy for off-grid solar systems?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: No. The Indian government subsidy (PM Surya Ghar Muft Bijli Yojana) is applicable only for on-grid rooftop solar systems, not off-grid.</p>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: How many batteries are required?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: It depends on the size. Approximately 8-9 batteries (100 AH) for a 3kW system, and 10-11 batteries (500 AH) for a 5kW system.</p>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: Can I run an AC on an off-grid system?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: Yes, provided the solar array and battery bank are sized correctly to handle the high starting and running load of air conditioners.</p>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: How much does an off-grid system cost in India?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: Costs vary by component quality. Estimates range from ₹1.6 Lakhs for a 2kW system up to ₹6 Lakhs for a 10kW system.</p>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: What is the main disadvantage of off-grid solar?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: The high initial cost of batteries and regular maintenance (replacement every 5-7 years) results in a longer ROI period compared to on-grid.</p>
                                </div>
                            </div>
                        </div>
                      </ScrollReveal>
                  </div>
              </ScrollReveal>
          </div>
      )}

      {activeService === 'on-grid' && (
          <div className='transition-opacity duration-500'>
              <ScrollReveal>
                  <div className='bg-white rounded-2xl p-8 shadow-sm mb-8'>
                      <h2 className='text-3xl font-bold text-green-700 mb-6'>On-Grid Solar Systems</h2>
                      <div className='text-gray-700 mb-8 space-y-4 text-lg'>
                          <p>
                              An on-grid solar system is also known as a grid-tied system since it is connected to the main utility grid. One of the best benefits is the government subsidy, ranging between ₹30,000 and ₹78,000 depending on capacity.
                          </p>
                          <p>
                              Prices vary based on city, system size, and components. Here are indicative rates for standard systems:
                          </p>
                          <div className='bg-green-50 p-6 rounded-xl border border-green-100 mt-4'>
                              <p className='font-bold text-green-900 mb-3'>Estimated Costs (with Subsidy):</p>
                              <ul className='space-y-2'>
                                  <li className='flex justify-between border-b border-green-200 pb-2 last:border-0 last:pb-0'>
                                      <span>3 kW On-Grid System</span>
                                      <span className='font-bold text-gray-900'>~ ₹1,35,000</span>
                                  </li>
                                  <li className='flex justify-between border-b border-green-200 pb-2 last:border-0 last:pb-0'>
                                      <span>5 kW On-Grid System</span>
                                      <span className='font-bold text-gray-900'>~ ₹3,00,000</span>
                                  </li>
                              </ul>
                              <p className='text-xs text-gray-500 mt-3 italic'>*Prices are indicative estimates. Final cost depends on location, DISCOM charges, and component selection.</p>
                          </div>
                      </div>
                      
                      <ScrollReveal>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                            <div>
                                <h3 className='text-xl font-bold mb-4 text-gray-800'>How It Works</h3>
                                <img src={assets.ongrid_diagram} alt="On-Grid Solar System Diagram" className='w-full rounded-xl shadow-md mb-6' />
                                <ul className='list-disc pl-5 space-y-2 text-gray-600'>
                                    <li>Solar panels generate DC electricity.</li>
                                    <li>Grid-tie inverter converts it to grid-synced AC.</li>
                                    <li>Power is used by home appliances first.</li>
                                    <li>Excess power flows to the utility grid (Net Metering).</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className='text-xl font-bold mb-4 text-gray-800'>When to Use</h3>
                                <ul className='list-disc pl-5 space-y-2 text-gray-600'>
                                    <li>To reduce high electricity bills.</li>
                                    <li>When grid power is stable and reliable.</li>
                                    <li>If you want a lower upfront cost (no batteries).</li>
                                </ul>
                            </div>
                        </div>
                      </ScrollReveal>

                      <ScrollReveal delay={200}>
                        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='p-6 bg-green-50 rounded-xl border border-green-100'>
                                <h3 className='text-lg font-bold text-green-800 mb-3'>Advantages</h3>
                                <ul className='list-disc pl-5 space-y-1 text-gray-600 text-sm'>
                                    <li>Lower upfront cost (no batteries)</li>
                                    <li>Net metering credits for excess power</li>
                                    <li>High efficiency and reliability</li>
                                    <li>Low maintenance</li>
                                </ul>
                            </div>
                            <div className='p-6 bg-red-50 rounded-xl border border-red-100'>
                                <h3 className='text-lg font-bold text-red-800 mb-3'>Disadvantages</h3>
                                <ul className='list-disc pl-5 space-y-1 text-gray-600 text-sm'>
                                    <li>System shuts down during grid outages (safety)</li>
                                    <li>No backup power without hybrid inverter</li>
                                    <li>Dependent on grid policy</li>
                                </ul>
                            </div>
                        </div>
                      </ScrollReveal>

                      <ScrollReveal delay={300}>
                        <div className='mt-12'>
                            <h3 className='text-xl font-bold mb-6 text-gray-800'>Frequently Asked Questions</h3>
                            <div className='space-y-4'>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: Does an on-grid solar system need a battery?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: No. That is its beauty. It uses the grid as a virtual battery, making it the most affordable and low-maintenance option.</p>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: Do solar panels work at night?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: No. They only generate power when the sun shines. At night, your home automatically draws power from the public grid.</p>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: What is Net Metering?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: Net Metering is a mechanism where you get credits for the excess electricity your solar panels send back to the grid.</p>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: What is the difference between on-grid and hybrid?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: An on-grid system connects only to the grid (no battery). A hybrid system connects to both the grid and a battery bank for backup power.</p>
                                </div>
                                <div className='border-b pb-4'>
                                    <p className='font-semibold text-gray-700'>Q: What is the price of on-grid solar panels?</p>
                                    <p className='text-gray-600 text-sm mt-1'>A: Prices vary by technology. For example, high-efficiency MonoPERC half-cut panels in India typically cost around ₹24 per watt.</p>
                                </div>
                            </div>
                        </div>
                      </ScrollReveal>
                  </div>
              </ScrollReveal>
          </div>
      )}

        <ScrollReveal delay={400}>
            <div className='mt-16 text-center bg-green-900 rounded-3xl p-12 text-white'>
                <h2 className='text-3xl font-bold mb-4'>Conclusion</h2>
                <p className='mb-8 max-w-2xl mx-auto text-green-100'>
                    Both systems offer reliable clean energy. Off-grid provides independence, while On-grid offers cost savings and grid compatibility. 
                    Our experts can help you decide which is best for your unique situation.
                </p>
                <button onClick={handleContactClick} className='inline-block px-8 py-3 bg-white text-green-900 font-bold rounded-lg hover:bg-green-50 transition-colors shadow-md'>
                    Request a Free Consultation
                </button>
            </div>
        </ScrollReveal>
        </div>
    </div>
  )
}

export default OurServices
