'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const heroData = [
  {
    image: "https://i.pinimg.com/1200x/cd/e5/3b/cde53b4246989d18ff20f63d5675a424.jpg",
    title: "Innovative Solutions\nFor Automobile",
    cta: "VIEW SERVICE",
    link: "/services"
  },
  {
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80",
    title: "Premium Car Care\nRedefined",
    cta: "BOOK NOW",
    link: "/bookings"
  }
];
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full pt-16 px-0 overflow-hidden">
      {/* Mobile Hero (Mockup style) */}
      <div className="md:hidden relative w-full h-[240px] bg-[#1A1A1A] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            {/* Background Image that fills the space */}
            <div className="absolute inset-0">
              <img 
                src={heroData[currentSlide].image} 
                alt="Service Car"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content removed per user request */}
          </motion.div>
        </AnimatePresence>

        {/* Decorative Curve Line (On Top) */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-brand-orange rounded-t-[100%] scale-x-150 translate-y-1/2 z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[45%] bg-[#0A0A0A] rounded-t-[100%] scale-x-150 translate-y-1/2 z-20" />

        {/* Indicators (On Top of everything) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-30">
          {heroData.map((_, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${idx === currentSlide ? 'bg-brand-orange' : 'bg-white/20'}`} 
            />
          ))}
        </div>
      </div>

      {/* Desktop Hero */}
      <div className="hidden md:block relative h-screen w-full overflow-hidden bg-[#050505] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <motion.img
              src={heroData[currentSlide].image}
              alt={heroData[currentSlide].title}
              className="w-full h-full object-cover object-center"
              animate={{ scale: [1.05, 1] }}
              transition={{ duration: 5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent w-[70%]" />
            
            <div className="absolute inset-0 z-10 flex flex-col justify-center px-24">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <h1 className="text-5xl lg:text-7xl font-bold text-white capitalize leading-[1.1] mb-8 whitespace-pre-line">
                    {heroData[currentSlide].title}
                  </h1>
                </motion.div>
                <Link 
                  href={heroData[currentSlide].link} 
                  className="inline-block border border-brand-orange bg-brand-orange/10 hover:bg-brand-orange text-white hover:text-black font-medium uppercase text-[11px] tracking-widest px-10 py-4 transition-colors duration-300"
                >
                  {heroData[currentSlide].cta}
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Desktop Indicators */}
        <div className="absolute bottom-10 left-24 flex gap-3 z-30">
          {heroData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-12 h-1 rounded-full transition-all ${idx === currentSlide ? 'bg-brand-orange w-20' : 'bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
