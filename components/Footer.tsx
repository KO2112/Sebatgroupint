'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  // Year for copyright
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-b from-green-900 to-blue-950 pt-16 pb-8 overflow-hidden relative"
    >
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo and About */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <h3 className="text-2xl font-bold text-white">SEBAT GROUP</h3>
                <p className="text-green-400 text-sm">INTERNATIONAL</p>
              </Link>
            </div>
            
            <p className="text-white/80 mb-6">
              A leading international trader in sugar and other commodities since 2000, connecting suppliers and importers across global markets.
            </p>
            
            <div className="flex space-x-4">
              <Link href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform"></span>
            </h4>
            
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Products', 'News & Reports', 'Contact'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-white/80 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Products */}
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
              Our Products
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform"></span>
            </h4>
            
            <ul className="space-y-3">
              {[
                'Refined Sugar',
                'Crystal Sugar',
                'Brown Sugar',
                'Cube Sugar',
                'Sunflower Oil',
                'Flour',
                'Coffee'
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`/products/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-white/80 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform"></span>
            </h4>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-green-400 mr-3 mt-1 flex-shrink-0" size={18} />
                <span className="text-white/80">Unit No: 3O-01-BA903 Jewellery & Gemplex 3 Plot No: DMCC-PH2-J&GPlexS Jewellery & Gemplex Dubai / United Arab Emirates</span>
              </li>
              
              <li className="flex items-center">
                <Mail className="text-green-400 mr-3 flex-shrink-0" size={18} />
                <a href="mailto:info@sebatgroup.com" className="text-white/80 hover:text-green-400 transition-colors duration-300">info@sebatgroup.com</a>
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <h5 className="text-white font-medium mb-2">Subscribe to Our Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow bg-white/20 border border-transparent focus:border-green-500 rounded-l-md py-2 px-3 text-white placeholder-white/50 outline-none"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white rounded-r-md px-4 transition-colors duration-300">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Separator line */}
        <div className={`h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
        
        {/* Bottom footer */}
        <div className={`flex flex-col md:flex-row justify-between items-center text-white/60 text-sm transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} SEBAT Group International. All Rights Reserved.
          </div>
          
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-green-400 transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-green-400 transition-colors duration-300">Terms of Service</Link>
            <Link href="/cookies-policy" className="hover:text-green-400 transition-colors duration-300">Cookies Policy</Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements - matching existing sections */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-green-500 rounded-full opacity-10 blur-3xl -z-10" />
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl -z-10" />
    </footer>
  )
}