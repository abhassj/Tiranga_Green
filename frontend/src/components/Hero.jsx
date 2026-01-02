import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: assets.slider1,
      title: "Powering the Future with Solar",
      subtitle: "Sustainable energy solutions for a greener tomorrow"
    },
    {
      image: assets.slider2,
      title: "Efficient Off-Grid Systems",
      subtitle: "Energy independence for your home and business"
    },
    {
      image: assets.slider3,
      title: "Advanced On-Grid Solutions",
      subtitle: "Maximize your savings with net metering"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic styles
  const scale = Math.max(0.90, 1 - scrollY / 2000); // Minimum scale 0.90
  const borderRadius = Math.min(40, scrollY / 10); // Max border radius 40px
  const opacity = Math.max(0.8, 1 - scrollY / 1000); // Slight fade

  return (
    <div 
        style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
            opacity: opacity,
        }}
        className='relative w-full h-[calc(100vh-80px)] overflow-hidden bg-gray-900 transition-all duration-100 ease-out shadow-2xl mx-auto'
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className='w-full h-full object-cover object-center opacity-75'
          />
           <div className="absolute inset-0 bg-black/40"></div>
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4'>
            <h1 className='text-4xl sm:text-6xl font-bold mb-4 drop-shadow-lg tracking-wider'>{slide.title}</h1>
            <p className='text-lg sm:text-2xl mb-8 drop-shadow-md max-w-2xl text-gray-100'>{slide.subtitle}</p>
            <div className='flex gap-4'>
                <Link to='/services' className='px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all shadow-lg hover:scale-105'>
                    Our Services
                </Link>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className='px-8 py-3 bg-white/10 backdrop-blur-md border border-white hover:bg-white hover:text-green-900 text-white rounded-full font-semibold transition-all shadow-lg hover:scale-105'>
                   Contact Us
                </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Dots */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-green-500 w-8' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;