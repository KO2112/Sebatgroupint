'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Define types for navigation structure
type NavItem = {
  name: string;
  path: string;
  children?: NavItem[];
};

// Define banner slide type
type BannerSlide = {
  imageSrc: string;
  title: string;
  description: string;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA: {
    text: string;
    link: string;
  };
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Carousel states with continuous operation
  const [currentSlide, setCurrentSlide] = useState(0);
  // Removed isPaused state since we want continuous operation
  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const slideStartTimeRef = useRef<number>(Date.now());

  // Banner content for carousel
  const bannerSlides: BannerSlide[] = [
    {
      imageSrc: "/3.jpeg",
      title: "Premium Sugar Solutions",
      description: "Elevating industry standards with high-quality sugar products and tailored solutions for diverse business needs.",
      primaryCTA: {
        text: "Contact Us",
        link: "/contact"
      },
      secondaryCTA: {
        text: "Explore Products",
        link: "/products"
      }
    },
    {
      imageSrc: "/4.jpeg",
      title: "Sustainable Production",
      description: "Leading the way in environmentally conscious sugar processing with state-of-the-art technology and responsible practices.",
      primaryCTA: {
        text: "Our Process",
        link: "/process"
      },
      secondaryCTA: {
        text: "Sustainability",
        link: "/sustainability"
      }
    },
    {
      imageSrc: "/5.jpeg",
      title: "Global Distribution Network",
      description: "Delivering premium sugar products worldwide with efficiency and reliability through our extensive logistics network.",
      primaryCTA: {
        text: "Our Reach",
        link: "/distribution"
      },
      secondaryCTA: {
        text: "Become a Partner",
        link: "/partners"
      }
    }
  ];

  // Define navigation structure with children for better organization
  const navItems: NavItem[] = [
    { 
      name: 'Home', 
      path: '/',
      children: [
        { name: 'Welcome', path: '/' },
        { name: 'Features', path: '/features' },
        { name: 'Highlights', path: '/highlights' }
      ]
    },
    { 
      name: 'About Us', 
      path: '/about',
      children: [
        { name: 'Who We Are', path: '/about/who-we-are' },
        { name: 'Our Values', path: '/about/values' },
        { name: 'Management', path: '/about/management' },
        { name: 'History', path: '/about/history' }
      ]
    },
    { 
      name: 'Sugar', 
      path: '/sugar',
      children: [
        { name: 'Products', path: '/sugar/products' },
        { name: 'Manufacturing', path: '/sugar/manufacturing' },
        { name: 'Quality Control', path: '/sugar/quality' },
        { name: 'Applications', path: '/sugar/applications' }
      ]
    },
    { 
      name: 'Prices', 
      path: '/prices',
      children: [
        { name: 'Current Prices', path: '/prices/current' },
        { name: 'Price Trends', path: '/prices/trends' },
        { name: 'Bulk Orders', path: '/prices/bulk' }
      ]
    },
    { 
      name: 'Related Links', 
      path: '/links',
      children: [
        { name: 'Industry News', path: '/links/news' },
        { name: 'Partners', path: '/links/partners' },
        { name: 'Resources', path: '/links/resources' }
      ]
    },
    { 
      name: 'Reports', 
      path: '/reports',
      children: [
        { name: 'Annual Reports', path: '/reports/annual' },
        { name: 'Market Analysis', path: '/reports/market' },
        { name: 'Sustainability', path: '/reports/sustainability' }
      ]
    },
    { 
      name: 'Gallery', 
      path: '/gallery',
      children: [
        { name: 'Facilities', path: '/gallery/facilities' },
        { name: 'Products', path: '/gallery/products' },
        { name: 'Events', path: '/gallery/events' }
      ]
    },
    { 
        name: 'Contact Us', 
        path: '/pages/ContactUs',
        children: [
          { name: 'Get in Touch', path: '/contactus' },
          { name: 'Locations', path: '/contact/locations' },
          { name: 'Careers', path: '/contact/careers' }
        ]
      },
  ];

  // Slide duration in milliseconds
  const SLIDE_DURATION = 5000;
  
  // Set up continuous animation frame loop for progress bars
  const [progressPercentages, setProgressPercentages] = useState<number[]>(
    bannerSlides.map(() => 0)
  );

  // Handle slide navigation with continuous operation
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    slideStartTimeRef.current = Date.now();
    
    // Reset progress for all slides
    setProgressPercentages(prevState => {
      const newState = [...prevState];
      newState.fill(0);
      return newState;
    });
  }, []);

  const goToNextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % bannerSlides.length;
    setCurrentSlide(nextIndex);
    slideStartTimeRef.current = Date.now();
    
    // Reset progress for all slides
    setProgressPercentages(prevState => {
      const newState = [...prevState];
      newState.fill(0);
      return newState;
    });
  }, [currentSlide, bannerSlides.length]);

  // Continuous timer that works regardless of tab visibility
  useEffect(() => {
    // Reset start time when component mounts
    startTimeRef.current = Date.now();
    slideStartTimeRef.current = Date.now();
    setIsLoaded(true);
    
    // Animation frame loop for continuous progress
    let animationFrameId: number;
    
    const updateProgress = () => {
      // Removed isPaused check - always update progress
      const currentTime = Date.now();
      const elapsedTime = currentTime - slideStartTimeRef.current;
      const progress = Math.min(100, (elapsedTime / SLIDE_DURATION) * 100);
      
      // Update progress for current slide
      setProgressPercentages(prevState => {
        const newState = [...prevState];
        newState[currentSlide] = progress;
        return newState;
      });
      
      // Check if it's time to advance to next slide
      if (elapsedTime >= SLIDE_DURATION) {
        goToNextSlide();
      }
      
      // Continue the animation frame loop
      animationFrameId = requestAnimationFrame(updateProgress);
    };
    
    // Start the animation frame loop
    animationFrameId = requestAnimationFrame(updateProgress);
    
    return () => {
      // Clean up animation frame on unmount
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [currentSlide, goToNextSlide, bannerSlides.length]);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    // Check if screen is mobile on mount and when window is resized
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    // Add throttled scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up events
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [handleScroll]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav') && !target.closest('button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  return (
    <>
      {/* Hero Banner Carousel with continuous operation */}
      <div 
        className="relative h-screen w-full overflow-hidden"
        // Removed onMouseEnter and onMouseLeave handlers to prevent pausing
      >
        {/* Banner Images */}
        <div className="relative w-full h-full">
          {bannerSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                currentSlide === index 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={slide.imageSrc}
                alt={`Sebat Sugar - ${slide.title}`}
                width={1920}
                height={800}
                className="w-full h-full object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
            </div>
          ))}
        </div>
        
        {/* Progress Indicators with continuous operation */}
        <div className="absolute z-20 bottom-8 left-0 right-0">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 mb-2">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white w-8' 
                      : 'bg-white/40 w-2 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentSlide === index}
                ></button>
              ))}
            </div>
            
            {/* Progress bars with continuous operation */}
            <div className="flex w-full gap-1">
              {bannerSlides.map((_, index) => (
                <div 
                  key={index} 
                  className="h-1 bg-white/20 rounded-full overflow-hidden flex-1"
                >
                  <div
                    className="h-full bg-green-500 rounded-full transition-none"
                    style={{
                      width: `${currentSlide === index ? progressPercentages[index] : 0}%`
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Content for each slide */}
        {bannerSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 flex items-center z-20 transition-all duration-700 ${
              currentSlide === index 
                ? 'opacity-100 transform translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 transform -translate-x-full' 
                  : 'opacity-0 transform translate-x-full'
            }`}
            aria-hidden={currentSlide !== index}
          >
            <div className="container mx-auto px-6 pt-24">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={slide.primaryCTA.link} 
                  className="px-8 py-3 bg-white text-blue-800 font-medium rounded-md hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {slide.primaryCTA.text}
                </Link>
                <Link 
                  href={slide.secondaryCTA.link}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors duration-300"
                >
                  {slide.secondaryCTA.text}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navbar with improved accessibility */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || hoveredItem ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo with Link */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image 
                  src="/1.png" 
                  alt="Sebat Group Logo" 
                  width={200} 
                  height={70} 
                  className={`h-22 w-auto transition-all duration-300 ${
                    scrolled || hoveredItem ? 'filter-none' : 'brightness-0 invert'
                  }`} 
                />
              </Link>
            </div>
            
            {/* Desktop Navigation with improved accessibility */}
            <nav className="hidden md:block" aria-label="Desktop Navigation">
              <ul className="flex">
                {navItems.map((item) => (
                  <li 
                    key={item.name} 
                    className="relative group"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.path}
                      className={`px-5 py-8 text-base font-medium transition-all duration-300 flex items-center ${
                        hoveredItem === item.name 
                          ? 'text-white bg-green-600' 
                          : scrolled || hoveredItem
                            ? 'text-gray-800 hover:text-green-600'
                            : 'text-white hover:text-green-200'
                      }`}
                      aria-expanded={hoveredItem === item.name}
                      aria-haspopup="true"
                      role="button"
                      onClick={(e) => {
                        if (item.children?.length) {
                          e.preventDefault();
                          setHoveredItem(hoveredItem === item.name ? null : item.name);
                        }
                      }}
                    >
                      {item.name}
                      {item.children?.length ? (
                        <ChevronDown 
                          size={16} 
                          className={`ml-1 transition-transform duration-200 ${
                            hoveredItem === item.name ? 'transform rotate-180' : ''
                          }`} 
                          aria-hidden="true"
                        />
                      ) : null}
                    </Link>
                    
                    {/* Dropdown Menu with improved transitions */}
                    {item.children?.length && (
                      <div 
                        className={`absolute left-0 w-64 bg-white shadow-lg transform transition-all duration-300 origin-top-left z-10 ${
                          hoveredItem === item.name ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                        }`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`dropdown-${item.name}`}
                      >
                        <div className="py-2 divide-y divide-gray-100">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.path}
                              className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                              role="menuitem"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Mobile menu button with improved accessibility */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  scrolled 
                    ? 'text-gray-700 hover:text-green-600' 
                    : 'text-white hover:text-green-200'
                }`}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu with improved accessibility and animations */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } bg-white shadow-lg`}
          aria-hidden={!isOpen}
        >
          <nav className="px-4 py-2" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                <div 
                  className="flex justify-between items-center py-3 px-2 cursor-pointer"
                  onClick={() => setHoveredItem(hoveredItem === item.name ? null : item.name)}
                  role="button"
                  aria-expanded={hoveredItem === item.name}
                  aria-controls={`mobile-submenu-${item.name}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setHoveredItem(hoveredItem === item.name ? null : item.name);
                    }
                  }}
                >
                  <Link 
                    href={item.path}
                    className="text-base font-medium text-gray-800"
                    onClick={(e) => {
                      if (item.children?.length) {
                        e.preventDefault();
                      } else {
                        setIsOpen(false);
                      }
                      e.stopPropagation();
                    }}
                  >
                    {item.name}
                  </Link>
                  {item.children?.length && (
                    <ChevronDown 
                      size={18} 
                      className={`text-gray-500 transition-transform duration-300 ${
                        hoveredItem === item.name ? 'transform rotate-180' : ''
                      }`} 
                      aria-hidden="true"
                    />
                  )}
                </div>
                
                {/* Mobile Dropdown Content with improved transitions */}
                {item.children?.length && (
                  <div 
                    id={`mobile-submenu-${item.name}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      hoveredItem === item.name 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                    role="menu"
                    aria-labelledby={`mobile-menu-${item.name}`}
                  >
                    <div className="bg-gray-50 py-2 pl-6">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className="block py-2 px-4 text-sm text-gray-700 hover:text-green-600"
                          role="menuitem"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}