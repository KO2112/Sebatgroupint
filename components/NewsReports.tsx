'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

export default function NewsReports() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Simple reports data
  const reports = [
    {
      id: '1',
      title: 'Global Sugar Market Trends',
      date: 'April 5, 2025',
      imageSrc: '/8.jpg',
      excerpt: 'Analysis of current market trends and future projections for the sugar industry.'
    },
    {
      id: '2',
      title: 'Brazil Harvest Update',
      date: 'March 28, 2025',
      imageSrc: '/9.jpg',
      excerpt: 'Latest updates on Brazil\'s harvest season and its impact on global sugar supply.'
    },
    {
      id: '3',
      title: 'Monthly Price Overview',
      date: 'March 22, 2025',
      imageSrc: '/10.jpg',
      excerpt: 'Current price movements for raw and refined sugar across major markets.'
    }
  ]

  // Animation on scroll - same as AboutUs component
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
      className="bg-gradient-to-b from-green-900 to-blue-900 py-20 overflow-hidden relative"
    >
      {/* Refined separator at the top of the section */}
      <div className="absolute top-0 left-0 right-0 w-full">
        {/* Simple, elegant divider line */}
        <div className="relative h-px w-full">
          {/* Main gradient line */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 max-w-4xl h-px bg-gradient-to-r from-transparent via-green-400 to-transparent transition-all duration-1000 ${isVisible ? 'opacity-60 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          
          {/* Center diamond accent */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-green-500 transition-all duration-700 ${isVisible ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`} style={{ transitionDelay: '300ms' }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-8">
        {/* Section header */}
        <div className={`mb-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
            News & Reports
            <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform"></span>
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Stay informed with our latest market updates and industry insights from the global sugar market.
          </p>
        </div>

        {/* Reports grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report, index) => (
            <div 
              key={report.id}
              className={`bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48">
                <Image
                  src={report.imageSrc}
                  alt={report.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-green-400 mb-3">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">{report.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{report.title}</h3>
                <p className="text-white/80 text-sm mb-4">{report.excerpt}</p>
                
                <Link 
                  href={`/news/${report.id}`}
                  className="group flex items-center text-green-400 hover:text-green-300 font-medium text-sm"
                >
                  Read More
                  <ArrowRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="mt-12 text-center">
          <Link 
            href="/news"
            className="group flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mx-auto inline-flex"
          >
            View All Updates
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
      {/* Decorative elements - matching About Us section */}
      <div className="absolute right-0 top-1/2 w-64 h-64 bg-green-500 rounded-full opacity-10 blur-3xl -z-10" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl -z-10" />
    </section>
  )
}