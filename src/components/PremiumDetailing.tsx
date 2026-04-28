"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Car, Shield, Sparkles, UserCheck, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function PremiumDetailing() {
  const features = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Mobile Service",
      description: "Professional detailing at your home or office.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Premium Protection",
      description: "High-grade products for lasting shine & care.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Detail Perfection",
      description: "Deep cleaning with attention to every corner.",
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Certified Experts",
      description: "Trained technicians using advanced techniques.",
    },
  ];

  return (
    <section className="relative w-full bg-[#030303] text-white py-24 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-[150px] -z-10 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Hero Layout: Robust Overlap */}
        <div className="flex flex-col lg:flex-row items-center gap-0 mb-32">
          
          {/* Content Card (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[48%] z-20"
          >
            <div className="bg-[#0A0A0A] backdrop-blur-3xl border border-white/10 p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[20px_20px_60px_rgba(0,0,0,0.8)] lg:mr-[-10%] relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-brand-orange" />
                <span className="text-brand-orange text-[10px] font-black uppercase tracking-[0.4em]">
                  Mastercraft
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                Premium Detailing <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ffaa44] italic">At Your Door</span>
              </h2>

              <p className="text-white/40 text-sm md:text-base leading-relaxed mb-12 font-medium max-w-md">
                Whether you're short on time or simply love convenience, our mobile car detailing brings top-tier cleaning right to your doorstep. We use only high-grade products and expert techniques.
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <button
                  onClick={() => {
                    const contactForm = document.getElementById('booking-contact-form');
                    if (contactForm) {
                      const offset = 100;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = contactForm.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-3 bg-brand-orange text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all duration-500 group shadow-[0_10px_30px_rgba(246,150,33,0.3)] cursor-pointer"
                >
                  Book Session
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                    <PhoneCall size={18} className="text-brand-orange group-hover:text-black transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none mb-1">Call Now</span>
                    <span className="text-white font-black text-sm">+971 50 237 4199</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Image Container (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[62%] mt-[-40px] lg:mt-0"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-white/5">
              <Image
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2000&auto=format&fit=crop"
                alt="Premium Detailing"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/80" />
            </div>
          </motion.div>
        </div>

        {/* Features Row: Sleek Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-8 rounded-3xl bg-[#080808] border border-white/5 hover:border-brand-orange/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 blur-2xl -z-10 group-hover:bg-brand-orange/10 transition-colors" />
              
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-black transition-all duration-500">
                {feature.icon}
              </div>
              
              <h3 className="text-lg font-black text-white mb-3 tracking-tight group-hover:text-brand-orange transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-white/30 text-xs font-medium leading-relaxed group-hover:text-white/50 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
