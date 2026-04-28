"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function Locations() {
  return (
    <section className="relative w-full py-32 bg-[#020202] overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-orange/10 blur-[120px] rounded-full" />
      </div>
      
      {/* Stylized Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 min-h-[600px]">
          
          {/* Left: Atmospheric Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative flex justify-center"
          >
            <div className="relative group w-full max-w-[500px] aspect-[4/5] sm:aspect-square">
              <div className="absolute -inset-4 bg-brand-orange/10 blur-3xl rounded-[3rem] opacity-50" />
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury Car Detail"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="relative rounded-[2.5rem] border border-white/10 shadow-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 object-cover"
              />
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-brand-orange p-6 rounded-3xl shadow-2xl z-20"
              >
                <span className="text-black font-black text-3xl italic leading-none">24/7</span>
                <p className="text-black font-bold text-[8px] uppercase tracking-widest mt-1">Availability</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Network Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-[2px] bg-brand-orange" />
                <span className="text-brand-orange text-[9px] font-black tracking-[0.5em] uppercase">
                  Service Network
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase italic leading-[0.95] mb-6">
                United Arab <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-[#ffaa44]">Emirates</span>
              </h2>
              <p className="text-white/40 text-sm font-medium max-w-md leading-relaxed">
                We are expanding our premium mobile detailing network across the UAE. Currently serving Dubai with upcoming expansions.
              </p>
            </motion.div>

            {/* Location Cards */}
            <div className="grid gap-4 max-w-lg">
              {[
                { city: 'Dubai', status: 'Service Region', active: true },
                { city: 'Abu Dhabi', status: 'Coming Soon', active: false },
                { city: 'Sharjah', status: 'On-coming', active: false }
              ].map((loc, idx) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group relative p-5 rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${
                    loc.active 
                    ? 'bg-brand-orange/5 border-brand-orange/20' 
                    : 'bg-white/[0.02] border-white/5 grayscale opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        loc.active ? 'bg-brand-orange text-black' : 'bg-white/5 text-white/20'
                      }`}>
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white uppercase italic group-hover:text-brand-orange transition-colors">
                          {loc.city}
                        </h3>
                        <p className={`text-[8px] font-black uppercase tracking-widest mt-0.5 ${
                          loc.active ? 'text-brand-orange' : 'text-white/20'
                        }`}>
                          {loc.status}
                        </p>
                      </div>
                    </div>
                    {loc.active && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full">
                        <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                        <span className="text-brand-orange text-[8px] font-black uppercase tracking-widest">Active</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

