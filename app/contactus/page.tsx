'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactUs() {
  const [isVisible, setIsVisible] = useState(false)
  const [isInfoVisible, setIsInfoVisible] = useState(false)
  const [isMapVisible, setIsMapVisible] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    // Simulate form submission
    setTimeout(() => {
      // This would be replaced with actual form submission logic
      if (Math.random() > 0.1) { // 90% success rate for demo
        setFormStatus('success')
        setFormState({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        setFormStatus('error')
      }
    }, 1500)
  }

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          // Staggered animations
          setTimeout(() => setIsInfoVisible(true), 300)
          setTimeout(() => setIsMapVisible(true), 600)
          setTimeout(() => setIsFormVisible(true), 900)
          
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
      className="bg-gradient-to-b from-blue-900 to-green-900 py-24 overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute right-0 top-1/3 w-64 h-64 bg-green-500 rounded-full opacity-10 blur-3xl -z-10" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl -z-10" />
      <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-blue-300 rounded-full opacity-5 blur-xl -z-10" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative inline-block">
            Contact Us
            <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform"></span>
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Get in touch with our team for inquiries about our products, services, or any other information you may need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info Card */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-300 ${isInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl h-full">
              <h3 className="text-2xl font-bold text-white mb-6 relative inline-block">
                Contact Information
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform"></span>
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-green-400 mt-1 mr-4 flex-shrink-0" size={22} />
                  <div>
                    <h4 className="text-white font-medium mb-1">Address</h4>
                    <p className="text-white/80">
                      Unit No: 3O-01-BA903<br />
                      Jewellery & Gemplex 3<br />
                      Plot No: DMCC-PH2-J&GPlexS<br />
                      Jewellery & Gemplex<br />
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-green-400 mr-4 flex-shrink-0" size={22} />
                  <div>
                    <h4 className="text-white font-medium mb-1">Phone</h4>
                    <a href="tel:+9715xxxxxxxx" className="text-white/80 hover:text-green-400 transition-colors duration-300">
                      +971 5XX XXX XXXX
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-green-400 mr-4 flex-shrink-0" size={22} />
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <a href="mailto:info@sebatgroup.com" className="text-white/80 hover:text-green-400 transition-colors duration-300">
                      info@sebatgroup.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="text-green-400 mr-4 flex-shrink-0" size={22} />
                  <div>
                    <h4 className="text-white font-medium mb-1">Business Hours</h4>
                    <p className="text-white/80">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-white font-medium mb-3">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Google Map */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-600 ${isMapVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-xl h-96 md:h-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28911.84259623539!2d55.141187!3d25.068656!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdc22defd3201061c!2sDubai%20Multi%20Commodities%20Centre%20Authority!5e0!3m2!1sen!2str!4v1623136242588!5m2!1sen!2str"
                className="w-full h-full border-0" 
                allowFullScreen
                loading="lazy"
                title="DMCC Location"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className={`mt-12 transition-all duration-1000 delay-900 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6 relative inline-block">
              Send Us a Message
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform"></span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/20 border border-white/10 focus:border-green-500 rounded-md px-4 py-3 text-white placeholder-white/50 outline-none transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/20 border border-white/10 focus:border-green-500 rounded-md px-4 py-3 text-white placeholder-white/50 outline-none transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/10 focus:border-green-500 rounded-md px-4 py-3 text-white placeholder-white/50 outline-none transition-colors duration-300"
                  placeholder="+971 XX XXX XXXX"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-white/20 border border-white/10 focus:border-green-500 rounded-md px-4 py-3 text-white placeholder-white/50 outline-none transition-colors duration-300 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              {/* Form status messages */}
              {formStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-md flex items-center">
                  <CheckCircle size={20} className="mr-2 flex-shrink-0" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-md flex items-center">
                  <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                  <span>Sorry, there was an error sending your message. Please try again.</span>
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="group flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}