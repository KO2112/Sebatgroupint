'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function HeroBanner() {
  // Carousel states with continuous operation
  const [currentSlide, setCurrentSlide] = useState(0);
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
    
    // Animation frame loop for continuous progress
    let animationFrameId: number;
    
    const updateProgress = () => {
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

  return (
    <div className="relative h-screen w-full overflow-hidden">
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
  );
}