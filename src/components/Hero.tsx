'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const heroData = [
  {
    video: "/0426.mp4",
    subtitle: "ESTABLISHED 2024 — DUBAI, UAE",
    title: "Mastering\nThe Art Of",
    titleAccent: "Detailing",
    description: "Experience the pinnacle of automotive care with our bespoke mobile detailing services. Precision, passion, and unparalleled shine delivered to your doorstep.",
    cta: "SECURE BOOKING",
    link: "/bookings"
  }
];

const Hero = () => {
  const currentSlide = 0;

  return (
    <section className="relative w-full pt-16 px-0 overflow-hidden">
      {/* Mobile Hero (Immersive Video Layout) */}
      <div className="md:hidden relative w-full h-[520px] bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            src={heroData[currentSlide].video}
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/car-clean.png"
            preload="metadata"
            className="w-full h-full object-cover"
          />
          {/* Immersive Gradients - Darker at bottom for text, clear at top for video */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
        </div>

        {/* Floating Content (No bulky card, just clean typography) */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-brand-orange" />
              <span className="text-brand-orange text-[9px] font-black uppercase tracking-[0.4em]">
                {heroData[currentSlide].subtitle}
              </span>
            </div>
            
            <h2 className="text-5xl font-black text-white leading-[0.9] uppercase italic">
              {heroData[currentSlide].title} <br/>
              <span className="text-brand-orange">{heroData[currentSlide].titleAccent}</span>
            </h2>
            
            <p className="text-white/70 text-xs leading-relaxed max-w-[280px] font-medium">
              {heroData[currentSlide].description}
            </p>
            
            <button 
              onClick={() => {
                const contactForm = document.getElementById('booking-contact-form');
                if (contactForm) {
                  const offset = 100;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = contactForm.getBoundingClientRect().top;
                  window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
                }
              }}
              className="mt-4 flex items-center justify-between bg-brand-orange text-black px-8 py-5 rounded-2xl font-black uppercase italic text-xs tracking-widest active:scale-95 transition-transform"
            >
              {heroData[currentSlide].cta}
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Desktop Hero */}
      <div className="hidden md:block relative h-[90vh] w-full overflow-hidden bg-[#050505]">
        <div className="absolute inset-0">
          <video 
            src={heroData[currentSlide].video}
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/car-clean.png"
            preload="metadata"
            className="w-full h-full object-cover grayscale-[0.2] brightness-[0.7]"
          />
          
          {/* Dynamic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent w-full z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(246,150,33,0.05)_0%,transparent_50%)] z-10" />
          
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-24 lg:px-32">
            <div className="max-w-4xl">
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[2px] bg-brand-orange" />
                  <span className="text-brand-orange text-[10px] font-black tracking-[0.6em] uppercase italic">
                    {heroData[currentSlide].subtitle}
                  </span>
                </div>
                
                <h1 className="text-[5.5rem] lg:text-[8rem] font-black text-white uppercase italic leading-[0.85] mb-8 tracking-tighter max-w-[900px]">
                  {heroData[currentSlide].title} <br/>
                  <span className="relative inline-block mt-2">
                    {/* Layer 1: The Stroke (Bottom) */}
                    <span className="absolute inset-0 text-transparent pointer-events-none select-none" 
                          style={{ WebkitTextStroke: '2px #f69621' }}>
                      {heroData[currentSlide].titleAccent}
                    </span>
                    {/* Layer 2: The Blend (Middle) */}
                    <span className="absolute inset-0 text-brand-orange mix-blend-overlay opacity-80 pointer-events-none select-none">
                      {heroData[currentSlide].titleAccent}
                    </span>
                    {/* Layer 3: The Base (Top - This one defines the width/height) */}
                    <span className="relative text-brand-orange">
                      {heroData[currentSlide].titleAccent}
                    </span>
                  </span>
                </h1>

                <p className="text-white/40 text-lg max-w-xl mb-12 font-medium leading-relaxed border-l-2 border-brand-orange/20 pl-8">
                  {heroData[currentSlide].description}
                </p>

                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => {
                      const contactForm = document.getElementById('booking-contact-form');
                      if (contactForm) {
                        const offset = 100;
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = contactForm.getBoundingClientRect().top;
                        window.scrollTo({ top: elementRect - bodyRect - offset, behavior: 'smooth' });
                      }
                    }}
                    className="group relative inline-flex items-center gap-6 bg-brand-orange text-black px-10 py-5 rounded-xl font-black uppercase italic text-sm tracking-[0.2em] transition-all duration-500 hover:scale-105 shadow-[0_20px_40px_rgba(246,150,33,0.2)]"
                  >
                    <span className="relative z-10">{heroData[currentSlide].cta}</span>
                    <div className="relative z-10 bg-black/10 p-1.5 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                      <ChevronRight size={18} />
                    </div>
                  </button>

                  <div className="flex flex-col">
                    <span className="text-white font-black text-2xl leading-none">4.9/5</span>
                    <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest mt-1">Customer Rating</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
