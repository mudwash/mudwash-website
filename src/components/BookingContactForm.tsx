"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Droplet, Calendar, Clock, Timer, Receipt, ArrowRight } from "lucide-react";

const summaryData = [
  {
    icon: <Car size={22} className="text-brand-orange" />,
    label: "Car Type",
    value: "Sedan",
  },
  {
    icon: <Droplet size={22} className="text-brand-orange" />,
    label: "Washing Plan",
    value: "Choose Your Plan",
  },
  {
    icon: <Calendar size={22} className="text-brand-orange" />,
    label: "Booking Date",
    value: "Choose Date",
  },
  {
    icon: <Clock size={22} className="text-brand-orange" />,
    label: "Booking Time",
    value: "Choose Time",
  },
  {
    icon: <Timer size={22} className="text-brand-orange" />,
    label: "Duration",
    value: "0 min",
  },
  {
    icon: <Receipt size={22} className="text-brand-orange" />,
    label: "Total Price",
    value: "AED 0",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BookingContactForm() {
  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center bg-[#050505] overflow-hidden">
      {/* Dynamic Glowing Background Nodes */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] xl:-top-[20%] -right-[10%] w-[500px] h-[500px] xl:w-[800px] xl:h-[800px] bg-brand-orange/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[0%] -left-[10%] w-[400px] h-[400px] bg-brand-orange/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2500')] opacity-[0.03] mix-blend-overlay object-cover" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-3 tracking-tight">
              Finalize Your Booking
            </h2>
            <div className="h-1 w-24 bg-brand-orange rounded-full mb-4 shadow-[0_0_15px_rgba(246,150,33,0.5)]" />
            <p className="text-white/50 text-sm max-w-lg mx-auto font-medium">
              (No Service in RTA paid parking & unauthorized building parking)
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          
          {/* Left Side: Premium Glass Summary Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {summaryData.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex items-center gap-5 overflow-hidden cursor-default shadow-xl"
              >
                {/* Icon Container */}
                <div className="relative z-10 w-14 h-14 flex-shrink-0 bg-black/50 border border-white/5 rounded-2xl flex items-center justify-center shadow-inner">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                    {item.label}
                  </span>
                  <span className={`text-lg font-black tracking-wide ${item.value.includes('Choose') ? 'text-brand-orange/80' : 'text-white'}`}>
                    {item.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side: Futuristic Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[45%] relative"
          >
            {/* Glowing Drop Shadow for the form */}
            <div className="absolute inset-0 bg-brand-orange/5 blur-[80px] rounded-[3rem] pointer-events-none" />
            
            <div className="relative h-full bg-gradient-to-b from-[#151515] to-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl flex flex-col justify-center">
              
              <div className="mb-8">
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                  Contact <span className="text-brand-orange">Details</span>
                </h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">
                  Enter your information below to secure your premium detailing session.
                </p>
              </div>

              <form className="space-y-5">
                {/* Inputs */}
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-[#1A1A1A] text-white px-6 py-4 rounded-2xl border border-transparent focus:border-brand-orange focus:bg-[#222] placeholder:text-gray-600 text-sm font-medium transition-all duration-300 outline-none hover:bg-[#222]"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full sm:w-1/2 bg-[#1A1A1A] text-white px-6 py-4 rounded-2xl border border-transparent focus:border-brand-orange focus:bg-[#222] placeholder:text-gray-600 text-sm font-medium transition-all duration-300 outline-none hover:bg-[#222]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full sm:w-1/2 bg-[#1A1A1A] text-white px-6 py-4 rounded-2xl border border-transparent focus:border-brand-orange focus:bg-[#222] placeholder:text-gray-600 text-sm font-medium transition-all duration-300 outline-none hover:bg-[#222]"
                  />
                </div>

                {/* Terms */}
                <div className="flex items-center gap-3 pt-2 pb-6">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="peer appearance-none w-5 h-5 border-2 border-gray-600 rounded cursor-pointer checked:border-brand-orange checked:bg-brand-orange transition-all"
                    />
                    <svg className="absolute w-3 h-3 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <label htmlFor="terms" className="text-white/60 text-xs sm:text-sm font-medium cursor-pointer hover:text-white transition-colors">
                    I agree to the <span className="text-white">Terms</span> & <span className="text-white">Privacy Policy</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  className="w-full group relative flex items-center justify-between bg-brand-orange text-black px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#ffaa42] transition-colors overflow-hidden"
                >
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 group-hover:animate-[shine_1.5s_ease-out_infinite]" />
                  
                  <span>Confirm Booking</span>
                  
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={18} />
                  </div>
                </button>
              </form>
            </div>
          </motion.div>
        
        </div>
      </div>
    </section>
  );
}
