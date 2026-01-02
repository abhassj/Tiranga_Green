import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [offeringsOpen, setOfferingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect scroll for shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    setVisible(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("contact");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById("contact");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]
        transition-all duration-300
        bg-white shadow-sm border-b border-gray-100
        h-[80px]
      `}
    >
      {/* Logo */}
      {/* Logo */}
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
        <img
          className="transition-all duration-300 object-contain w-36"
          src={assets.logo}
          alt="Tiranga Green Energy Solutions"
        />
      </Link>

      {/* Desktop navigation */}
      <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-700 uppercase tracking-wide">
        <NavLink to="/" className="flex flex-col items-center gap-1 hover:text-green-600 transition-colors">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-green-600 hidden" />
        </NavLink>

        <div className="relative group">
           <NavLink to="/services" className="flex flex-col items-center gap-1 hover:text-green-600 transition-colors">
            <p>Our Services</p>
             <hr className="w-2/4 border-none h-[1.5px] bg-green-600 hidden" />
          </NavLink>
        </div>

        <div className="relative group">
          <button className="flex flex-col items-center gap-1 hover:text-green-600 transition-colors group-hover:text-green-600">
            <p>OUR OFFERINGS</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-green-600 hidden group-hover:block transition-all" />
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block w-[400px]">
             <div className="bg-white rounded-2xl shadow-xl p-4 border border-green-50 flex flex-col gap-3">
                
                <Link to="/commercial" className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 transition-all group/item border border-transparent hover:border-green-200">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                      <img src={assets.icon_commercial} alt="Commercial" className="w-full h-full object-contain" />
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-800 text-base">Commercial</h4>
                      <p className="text-xs text-gray-400 normal-case tracking-normal">For businesses & offices</p>
                   </div>
                </Link>

                <Link to="/housing-societies" className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 transition-all group/item border border-transparent hover:border-green-200">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg p-2 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                      <img src={assets.icon_housing} alt="Housing" className="w-full h-full object-contain" />
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-800 text-base">Housing Societies</h4>
                      <p className="text-xs text-gray-400 normal-case tracking-normal">For apartments & complexes</p>
                   </div>
                </Link>

             </div>
          </div>
        </div>

        <NavLink to="/projects" className="flex flex-col items-center gap-1 hover:text-green-600 transition-colors">
          <p>Projects</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-green-600 hidden" />
        </NavLink>

        <button onClick={handleContactClick} className="flex flex-col items-center gap-1 hover:text-green-600 transition-colors uppercase">
          <p>Contact Us</p>
        </button>
      </ul>

      {/* Mobile menu icon */}
      <div className="flex items-center gap-4 md:hidden ml-auto">
        <img
          onClick={() => setVisible(true)}
          className="w-6 cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* Mobile sidebar */}
      {/* Mobile sidebar */}
      
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          visible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`} 
        onClick={() => setVisible(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 bg-white transition-transform duration-300 transform shadow-2xl ${
          visible ? "translate-x-0 w-[85%] sm:w-[60%]" : "translate-x-full w-[85%] sm:w-[60%]"
        }`}
      >
        <div className="flex flex-col h-full">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
               <img src={assets.logo} className="w-32 object-contain" alt="Logo" />
               <button onClick={() => setVisible(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <img src={assets.cross_icon} className="w-5 h-5 opacity-60" alt="Close" />
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
               <NavLink onClick={() => setVisible(false)} to="/" className={({ isActive }) => `flex items-center justify-between p-4 rounded-xl transition-all ${isActive ? 'bg-green-50 text-green-700 font-semibold shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <span className="text-lg">Home</span>
                  <span className="text-xl">›</span>
               </NavLink>

               <NavLink onClick={() => setVisible(false)} to="/services" className={({ isActive }) => `flex items-center justify-between p-4 rounded-xl transition-all ${isActive ? 'bg-green-50 text-green-700 font-semibold shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}>
                   <span className="text-lg">Our Services</span>
                   <span className="text-xl">›</span>
               </NavLink>

               {/* Our Offerings Dropdown */}
               <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setOfferingsOpen(!offeringsOpen)} 
                    className={`w-full flex items-center justify-between p-4 transition-all ${offeringsOpen ? 'bg-green-50 text-green-700' : 'bg-white text-gray-700'}`}
                  >
                     <span className="text-lg font-medium">Our Offerings</span>
                     <span className={`text-xl transition-transform duration-300 ${offeringsOpen ? 'rotate-90' : ''}`}>›</span>
                  </button>
                  
                  <div className={`flex flex-col bg-gray-50 transition-all duration-300 ${offeringsOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <Link to="/commercial" onClick={() => setVisible(false)} className="flex items-center gap-3 p-4 pl-6 border-t border-gray-100/50 hover:bg-green-100/50">
                          <span className="text-xl">🏢</span>
                          <span className="text-gray-700 font-medium">Commercial</span>
                      </Link>
                      <Link to="/housing-societies" onClick={() => setVisible(false)} className="flex items-center gap-3 p-4 pl-6 border-t border-gray-100/50 hover:bg-green-100/50">
                          <span className="text-xl">🏡</span>
                          <span className="text-gray-700 font-medium">Housing Societies</span>
                      </Link>
                  </div>
               </div>

                <NavLink onClick={() => setVisible(false)} to="/projects" className={({ isActive }) => `flex items-center justify-between p-4 rounded-xl transition-all ${isActive ? 'bg-green-50 text-green-700 font-semibold shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}>
                   <span className="text-lg">Projects</span>
                   <span className="text-xl">›</span>
               </NavLink>
            </div>

            {/* Footer CTA */}
             <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button onClick={handleContactClick} className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-wide shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                    Schedule a FREE Visit
                </button>
                <div className="text-center mt-4">
                     <p className="text-xs text-gray-400">Tiranga Green Energy Solutions</p>
                </div>
             </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
