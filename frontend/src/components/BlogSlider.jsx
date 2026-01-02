import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BlogSlider = () => {
    const news = [
        {
            title: "India Adds Record 24.5 GW Solar Capacity in 2024",
            date: "Jan 12, 2025",
            excerpt: "India installed approx 24.5 GW of new solar power capacity in 2024, doubling the previous year's additions.",
            category: "Milestone",
            image: "https://images.pexels.com/photos/9875417/pexels-photo-9875417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            link: "https://www.pv-magazine-india.com/2025/01/21/india-installed-24-5-gw-of-solar-capacity-in-2024/"
        },
        {
            title: "7 Lakh Homes Get Zero Bills with PM Surya Ghar",
            date: "Dec 16, 2024",
            excerpt: "Over 7.7 lakh households across India are now receiving zero electricity bills under the new rooftop solar scheme.",
            category: "Policy",
            image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=1000",
            link: "https://timesofindia.indiatimes.com/india/over-7-lakh-households-get-zero-electricity-bills-after-rooftop-solar-installation-under-govt-scheme/articleshow/116377755.cms"
        },
        {
            title: "Rajasthan Leads India with 7GW New Solar in 2024",
            date: "Jan 17, 2025",
            excerpt: "Rajasthan continues to dominate the utility-scale solar sector, adding over 7GW of capacity this year alone.",
            category: "State News",
            image: "https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=800",
            link: "https://timesofindia.indiatimes.com/city/jaipur/raj-builds-on-solar-power-in-24-but-struggles-in-rooftop-segment/articleshow/117316041.cms"
        },
         {
            title: "Govt Mandates Domestic Solar Modules (ALMM)",
            date: "Apr 01, 2024",
            excerpt: "The Ministry of New and Renewable Energy has reimposed the Approved List of Models and Manufacturers to boost local tech.",
            category: "Regulation",
            image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1000",
            link: "https://www.mercomindia.com/almm-reimposed-april-no-exemptions"
        },
        {
            title: "India's Solar Module Exports Surge in 2024",
            date: "Dec 30, 2024",
            excerpt: "Indian solar module exports to the US have nearly doubled, positioning India as a key global supplier.",
            category: "Business",
            image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000",
            link: "https://economictimes.indiatimes.com/industry/renewables/india-emerges-as-key-solar-supplier-to-us-exporting-almost-97-of-solar-modules-in-fy23-25-pl-capital/articleshow/113824177.cms"
        },
        {
            title: "Solar Reaches 47% of India's Renewable Capacity",
            date: "Dec 20, 2024",
            excerpt: "With recent additions, solar energy now accounts for nearly half of the country's total renewable energy install base.",
            category: "Growth",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000",
            link: "https://jmkresearch.com/renewable-sector-published-reports/monthly-re-update-december-2024/"
        }
    ]

  return (
    <div className='pt-20 pb-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white'>
      <div className='flex justify-between items-end mb-12'>
         <div>
            <h2 className='text-3xl font-bold text-gray-800 uppercase tracking-wide'>Latest News</h2>
            <div className='w-24 h-1 bg-green-500 mt-4 rounded-full'></div>
         </div>

      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }}
        className="pb-12"
      >
        {news.map((item, index) => (
            <SwiperSlide key={index} className='pb-10'>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className='group cursor-pointer h-full block'>
                    <div className='h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden relative'>
                         <img 
                            src={item.image} 
                            alt={item.title} 
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                         />
                         <div className='absolute top-4 left-4 bg-white/90 px-3 py-1 rounded text-xs font-bold text-green-700 uppercase'>
                            {item.category}
                         </div>
                    </div>
                    <p className='text-xs text-gray-500 mb-2'>{item.date}</p>
                    <h3 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-2'>{item.title}</h3>
                    <p className='text-gray-600 text-sm line-clamp-2'>{item.excerpt}</p>
                    <p className='mt-4 text-green-600 font-medium text-sm group-hover:underline'>Read More &rarr;</p>
                </a>
            </SwiperSlide>
        ))}
      </Swiper>
      

    </div>
  )
}

export default BlogSlider
