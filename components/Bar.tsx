'use client'
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Define types for navigation structure
type NavItem = {
  name: string;
  path: string;
  children?: NavItem[];
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
  );
}