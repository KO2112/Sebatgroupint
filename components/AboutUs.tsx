'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-b from-blue-900 to-green-900 py-20 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Text content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative">
              <span className="inline-block relative">
                About Us
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform"></span>
              </span>
            </h2>
            
            <div className="text-white/90 space-y-5">
              <p>
                Our Group is in International Commodity trading since early 2000. The Group set up SEBAT only for international commodity trading specially for Sugar trading. Today, SEBAT is one of the leading sugar traders and has been serving clients through out the world.
              </p>
              
              <p>
                SEBAT is offering continuous supply of the full range of sugars including Refined, Crystal, Brown, Cube shaped from different origins like Brazil, India, Thai, Mexico. SEBAT has been a strong bridge between Sugar suppliers and African and Middle East Countries.
              </p>
              
              <p>
                SEBAT is also trading in sunflower oil, flour, coffee.
              </p>
              
              <p>
                Our traders are dedicated to specific markets, having built strong direct relationships with refineries, growers and exporters in EU, Brazil, Thailand, and India, and with importers in Africa, the Middle East, and Asia.
              </p>
            </div>
            
            <div className="mt-8 flex items-center space-x-4">
              <Link 
                href="/contact" 
                className="group flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              <Link 
                href="/about"
                className="text-white hover:text-green-300 font-medium transition-colors duration-300 underline underline-offset-4"
              >
                Learn More
              </Link>
            </div>
            
            <div className="mt-10 inline-block">
              <p className="font-bold text-green-400 text-lg">SEBAT GROUP INTERNATIONAL | 2000</p>
            </div>
          </div>
          
          {/* Right side: Image and stats */}
<div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
  <div className="relative rounded-lg overflow-hidden shadow-2xl h-140 w-full">
    <Image 
      src="/7.jpg" 
      alt="SEBAT Sugar Trading" 
      width={800} 
      height={600}
      className="w-full h-full object-cover rounded-lg"
    />
              
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4">
                      <p className="text-3xl font-bold text-white">20+</p>
                      <p className="text-green-300">Years Experience</p>
                    </div>
                    <div className="text-center p-4">
                      <p className="text-3xl font-bold text-white">50+</p>
                      <p className="text-green-300">Global Partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature boxes */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-2">Quality Products</h3>
                <p className="text-white/80 text-sm">Premium sugar solutions from trusted global sources</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-2">Global Network</h3>
                <p className="text-white/80 text-sm">Strong connections across major markets worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-1/2 w-64 h-64 bg-green-500 rounded-full opacity-10 blur-3xl -z-10" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl -z-10" />
    </section>
  )
}