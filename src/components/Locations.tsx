"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const Locations = () => {
  return (
    <section className="relative w-full py-24 bg-[#050505] overflow-hidden">
      {/* Background World Map Pattern (Stylized) */}
      <div
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left: Image Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative flex justify-center"
          >
            {/* Soft glow behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-orange/10 blur-[100px] rounded-full point-events-none" />

            <img
              src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800"
              alt="High Pressure Washer"
              className="w-[80%] max-w-md object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:scale-105 transition-all duration-700"
            />
          </motion.div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 space-y-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-brand-orange"></div>
                <span className="text-brand-orange text-[10px] font-black tracking-[0.3em] uppercase">
                  Locations
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                Dubai
              </h2>
            </motion.div>

            {/* Grid Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {/* Item 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-3"
              >
                <MapPin className="text-brand-orange mt-1" size={24} />
                <div>
                  <h4 className="text-white font-extrabold text-lg mb-1">
                    Service region
                  </h4>
                  <p className="text-white/60 font-medium text-sm">Dubai</p>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-3"
              >
                <MapPin className="text-brand-orange mt-1" size={24} />
                <div>
                  <h4 className="text-white font-extrabold text-lg mb-1">
                    On-coming
                  </h4>
                  <p className="text-white/60 font-medium text-sm">Abu Dhabi</p>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-3"
              >
                <MapPin className="text-brand-orange mt-1" size={24} />
                <div>
                  <h4 className="text-white font-extrabold text-lg mb-1 uppercase">
                    On-coming
                  </h4>
                  <p className="text-white/60 font-medium text-sm">Sharjah</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
