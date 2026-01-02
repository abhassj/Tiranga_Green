import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    message: '',
    pincode: '',
    city: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.whatsapp || !formData.pincode) {
        setError('Please fill in all required fields.');
        setLoading(false);
        return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            phone: formData.whatsapp, // Mapping whatsapp to phone as per schema requirement if phone is primary
            whatsapp: formData.whatsapp,
            email: formData.email,
            message: formData.message,
            pincode: formData.pincode,
            city: formData.city,
            source: 'website-form'
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
            name: '',
            whatsapp: '',
            message: '',
            pincode: '',
            city: '',
            email: ''
        });
        alert('Thank you! Your enquiry has been submitted.');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='contact' className='py-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-green-900'>
      <div className='flex flex-col lg:flex-row gap-12 text-white items-center lg:items-start'>
        
        {/* Left Side Prompts */}
        <div className='lg:w-1/2 pt-10'>
            <h2 className='text-4xl sm:text-5xl font-bold leading-tight mb-6'>
                Schedule a <br/>
                <span className='text-green-300'>FREE consultation</span> <br/>
                with us today!
            </h2>
            <p className='text-lg text-green-100 max-w-md leading-relaxed'>
                Get genuine advice from our solar experts. No pressure, book only if you are satisfied!
            </p>

            <div className='mt-12 bg-green-800/50 p-6 rounded-xl border border-green-700 backdrop-blur-sm'>
                <h3 className='text-xl font-bold mb-4 text-green-300'>Get in touch:</h3>
                <div className='space-y-2'>
                    <div className='flex items-start gap-3'>
                        <span className='text-xl'>📞</span>
                        <div>
                            <p className='text-sm text-green-200 uppercase tracking-wider font-semibold'>Mobile</p>
                            <p className='text-white'>+91 95116 46006 / +91 78872 87165</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-3 pt-2'>
                        <span className='text-xl'>✉️</span>
                        <div>
                            <p className='text-sm text-green-200 uppercase tracking-wider font-semibold'>Email</p>
                            <p className='text-white'>info@TirangaGreen.in</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side Form */}
        <div className='lg:w-1/2 w-full'>
            <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-800'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    
                    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                    {success && <div className="text-green-600 text-sm mb-2 font-bold">Message sent successfully!</div>}

                    {/* Full Name */}
                    <div>
                        <label className='block text-sm font-semibold mb-2'>Full Name <span className='text-red-500'>*</span></label>
                        <input name="name" value={formData.name} onChange={handleChange} type="text" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors' required />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                        <label className='block text-sm font-semibold mb-2'>WhatsApp number <span className='text-red-500'>*</span></label>
                        <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors' required />
                    </div>

                    {/* Message */}
                    <div>
                        <label className='block text-sm font-semibold mb-2'>Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="How can we help you?" rows="4" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors resize-none'></textarea>
                    </div>

                    {/* Pin Code & City */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                             <label className='block text-sm font-semibold mb-2'>Pin code <span className='text-red-500'>*</span></label>
                             <input name="pincode" value={formData.pincode} onChange={handleChange} type="text" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors' required />
                        </div>
                         <div>
                             <label className='block text-sm font-semibold mb-2'>City</label>
                             <input name="city" value={formData.city} onChange={handleChange} type="text" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors' />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors' />
                    </div>

                    {/* Agreement Checkbox */}
                    <div className='flex items-start gap-2 text-sm text-gray-500'>
                        <input type="checkbox" className='mt-1 text-green-600 focus:ring-green-500 rounded' required />
                        <p>
                            I agree to Tiranga Green Energy's <Link to="/terms" className='text-green-600 underline'>terms of service</Link> & <Link to="/privacy-policy" className='text-green-600 underline'>privacy policy</Link>.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button type='submit' disabled={loading} className='w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg uppercase tracking-wide transform hover:-translate-y-1 disabled:opacity-50'>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>

                </form>
            </div>
        </div>

      </div>
    </div>
  )
}

export default ContactForm
