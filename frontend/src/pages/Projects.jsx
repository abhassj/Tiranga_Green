import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const navigate = useNavigate()

    const filters = ['All', 'Residential', 'Commercial', 'Industrial', 'Off-Grid', 'On-Grid']

    const projects = [
        {
            id: 1,
            title: "Industrial Rooftop Solution",
            category: "Industrial",
            status: "Completed",
            location: "Pune, Maharashtra",
            capacity: "100kW",
            image: assets.project_industrial,
            metrics: {
                savings: "80%",
                payback: "3.5 Yrs",
                co2: "120 Tons"
            },
            quote: "This installation has drastically reduced our operational costs. Highly recommended!",
            isFeatured: true
        },
        {
            id: 2,
            title: "Luxury Farmhouse Off-Grid",
            category: "Off-Grid",
            status: "Completed",
            location: "Lonavala, Maharashtra",
            capacity: "10kW",
            image: assets.project_offgrid,
            metrics: {
                savings: "100%",
                payback: "4.0 Yrs",
                co2: "12 Tons"
            },
            quote: "We are now completely independent of the grid. No more power cuts!",
            isFeatured: false
        },
        {
            id: 3,
            title: "Corporate Office Complex",
            category: "Commercial",
            status: "Ongoing",
            location: "Mumbai, Maharashtra",
            capacity: "50kW",
            image: assets.project_commercial,
            metrics: {
                savings: "40%",
                payback: "4.2 Yrs",
                co2: "60 Tons"
            },
            quote: "Seamless execution and professional team. Looking forward to full improved efficiency.",
            isFeatured: false
        },
        {
            id: 4,
            title: "Suburban Residential Villa",
            category: "Residential",
            status: "Completed",
            location: "Nashik, Maharashtra",
            capacity: "5kW",
            image: assets.project_residential,
            metrics: {
                savings: "90%",
                payback: "3.0 Yrs",
                co2: "6 Tons"
            },
            quote: "Perfect for our home needs. The installation was quick and clean.",
            isFeatured: false
        },
        {
            id: 5,
            title: "City Hospital Grid-Tied System",
            category: "On-Grid",
            status: "Completed",
            location: "Nagpur, Maharashtra",
            capacity: "75kW",
            image: assets.project_ongrid,
            metrics: {
                savings: "60%",
                payback: "3.2 Yrs",
                co2: "85 Tons"
            },
            quote: "Reliable power for critical operations with excellent net metering returns.",
            isFeatured: true
        }
    ]

    const filteredProjects = activeFilter === 'All' 
        ? projects 
        : projects.filter(project => project.category === activeFilter)

    return (
        <div className='min-h-screen bg-white pt-10 pb-20 font-sans'>
            
            {/* Header Section */}
            <div className='text-center mb-12 px-4'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4 inline-block relative'>
                    Our Projects
                    <span className='absolute bottom-0 left-0 w-full h-1 bg-green-500 rounded-full transform translate-y-2 opacity-80'></span>
                </h1>
                <p className='mt-8 text-lg text-gray-500 max-w-2xl mx-auto'>
                    Explore our successful solar installations driving a sustainable future across various sectors.
                </p>
            </div>

            {/* Filter Pills */}
            <div className='flex flex-wrap justify-center gap-3 mb-12 px-4'>
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                            activeFilter === filter
                                ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Slider Section */}
            <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className='rounded-3xl shadow-2xl overflow-hidden h-auto min-h-[600px] md:h-[650px] w-full bg-gray-50 project-swiper'
                    style={{
                        '--swiper-navigation-color': '#16a34a',
                        '--swiper-pagination-color': '#16a34a',
                    }}
                >
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <SwiperSlide key={project.id} className='relative w-full h-full bg-white flex flex-col md:block'>
                                {/* Image Container */}
                                <div className='relative w-full h-[300px] md:absolute md:inset-0 md:h-full group overflow-hidden'>
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className='w-full h-full object-cover transition-transform duration-[10000ms] ease-linear group-hover:scale-110'
                                    />
                                    <div className='absolute inset-0 bg-black/10 md:hidden'></div>
                                </div>

                                {/* Content Container */}
                                <div className='relative w-full bg-white px-6 py-8 md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 md:w-[450px] md:bg-white/95 md:backdrop-blur-sm md:p-10 md:rounded-2xl md:shadow-2xl md:border md:border-white/50'>
                                    
                                    {/* Badge & Location */}
                                    <div className='flex justify-between items-start mb-4'>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md ${
                                            project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {project.status}
                                        </span>
                                        <div className='flex items-center text-gray-500 text-sm'>
                                            <span className='mr-1'>📍</span> {project.location}
                                        </div>
                                    </div>

                                    {/* Title & Capacity */}
                                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight'>{project.title}</h2>
                                    <div className='flex items-baseline gap-2 mb-6'>
                                        <span className='text-2xl font-bold text-green-600'>{project.capacity}</span>
                                        <span className='text-gray-400 font-medium'>Installed Power</span>
                                    </div>

                                    {/* Metrics Grid */}
                                    <div className='grid grid-cols-3 gap-2 md:gap-4 border-t border-b border-gray-100 py-6 mb-6'>
                                        <div className='text-center'>
                                            <p className='text-lg font-bold text-gray-800'>{project.metrics.savings}</p>
                                            <p className='text-xs text-gray-400 uppercase tracking-wide mt-1'>Savings</p>
                                        </div>
                                        <div className='text-center border-l border-r border-gray-100'>
                                            <p className='text-lg font-bold text-gray-800'>{project.metrics.payback}</p>
                                            <p className='text-xs text-gray-400 uppercase tracking-wide mt-1'>Payback</p>
                                        </div>
                                        <div className='text-center'>
                                            <p className='text-lg font-bold text-gray-800'>{project.metrics.co2}</p>
                                            <p className='text-xs text-gray-400 uppercase tracking-wide mt-1'>CO₂ Saved</p>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <blockquote className='bg-gray-50 p-4 rounded-lg italic text-gray-600 text-sm mb-6 border-l-4 border-green-500'>
                                        "{project.quote}"
                                    </blockquote>

                                    {/* CTA Button */}
                                    <button 
                                        onClick={() => navigate('/services')}
                                        className='w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-green-200 md:shadow-none'
                                    >
                                        Explore Our Services
                                        <span className='group-hover:translate-x-1 transition-transform'>&rarr;</span>
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className='h-full flex items-center justify-center text-gray-500 text-lg'>
                            No projects found for this category.
                        </div>
                    )}
                </Swiper>
            </div>
            
            {/* Custom CSS for Animations scope if needed, currently using Tailwind + Swiper */}
            <style>{`
                .project-swiper .swiper-button-next,
                .project-swiper .swiper-button-prev {
                    background-color: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    color: white;
                }
                @media (max-width: 768px) {
                    .project-swiper .swiper-button-next,
                    .project-swiper .swiper-button-prev {
                        display: none !important;
                    }
                }
                .project-swiper:hover .swiper-button-next,
                .project-swiper:hover .swiper-button-prev {
                    opacity: 1;
                }
                .project-swiper .swiper-button-next:after,
                .project-swiper .swiper-button-prev:after {
                    font-size: 20px;
                    font-weight: bold;
                }
                .project-swiper .swiper-button-next:hover,
                .project-swiper .swiper-button-prev:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                    border-color: rgba(255, 255, 255, 0.5);
                    transform: scale(1.1);
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px) translateX(-50%); } 
                    /* Note: translateX(-50%) logic is complex here because of md: positioning differences. 
                       Simpler to let Tailwind handle most layout and just animate opacity/y-axis 
                       where context allows. For 'absolute' elements, simple fade in is safer. */
                }
            `}</style>
        </div>
    )
}

export default Projects
