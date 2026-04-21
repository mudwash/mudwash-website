'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Clock, Zap, MapPin } from 'lucide-react';

const availableServices = [
  "Exterior detailing",
  "Interior cleaning",
  "Wheel shining",
  "Leather conditioning",
  "Engine cleaning",
  "Paint correction",
  "Ceramic Coating",
  "General Service",
  "Oil Change",
  "Battery Replacement"
];

export default function BookingPage() {
  const [carQuery, setCarQuery] = useState("");
  const [carSuggestions, setCarSuggestions] = useState<string[]>([]);
  const [isSearchingCars, setIsSearchingCars] = useState(false);
  const [showCarDropdown, setShowCarDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [allCars, setAllCars] = useState<string[]>([]);
  const [serviceType, setServiceType] = useState(availableServices[0]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCarDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch the local indian cars dataset when page mounts
  useEffect(() => {
    setIsSearchingCars(true);
    fetch('/indian_cars.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllCars(data);
        }
        setIsSearchingCars(false);
      })
      .catch(err => {
        console.error("Failed to load cars dataset", err);
        setIsSearchingCars(false);
      });
  }, []);

  // Filter cars smoothly in-memory
  useEffect(() => {
    if (!carQuery || !showCarDropdown) {
      setCarSuggestions([]);
      return;
    }

    const query = carQuery.toLowerCase();
    const matches = allCars.filter(car => car.toLowerCase().includes(query));
    setCarSuggestions(matches.slice(0, 10));
  }, [carQuery, allCars, showCarDropdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6 md:px-12 lg:px-24 flex items-center">
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Info & Marketing */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <span className="text-brand-orange text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] mb-4 block">
              Schedule An Appointment
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
              BOOK YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">
                PREMIUM WASH
              </span>
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-md mb-12 leading-relaxed">
              Experience the pinnacle of automotive care. Reserve your slot today and let our expert detailers bring back your vehicle's showroom shine.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-brand-orange">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">100% Satisfaction</h3>
                  <p className="text-white/40 text-xs">Quality guaranteed on all services.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-brand-orange">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">Timely Delivery</h3>
                  <p className="text-white/40 text-xs">Prompt service with zero compromises.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-brand-orange">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">Prime Locations</h3>
                  <p className="text-white/40 text-xs">Easily accessible, premium garages.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Booking Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full bg-[#111111] border border-white/10 p-8 md:p-12 shadow-2xl relative rounded-2xl"
          >
            {bookingConfirmed ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck size={40} className="text-brand-orange" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Booking Confirmed!</h2>
                <p className="text-white/60 text-sm max-w-xs mb-8">
                  Your appointment has been successfully scheduled. We will contact you shortly to confirm the exact details.
                </p>
                <button 
                  onClick={() => setBookingConfirmed(false)}
                  className="bg-[#1A1A1A] border border-white/10 hover:border-brand-orange text-white text-xs font-bold uppercase tracking-wider px-8 py-3 transition-colors"
                >
                  Book Another Service
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide border-b border-white/5 pb-4">Reservation Details</h2>
                
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-2 px-1">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-[#1A1A1A] border border-white/5 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors" required />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-2 px-1">Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#1A1A1A] border border-white/5 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors" required />
                    </div>
                  </div>

                  <div className="relative z-50" ref={dropdownRef}>
                    <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-2 px-1">Vehicle Model</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tata Nexon" 
                      className="w-full bg-[#1A1A1A] border border-white/5 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors" 
                      required 
                      value={carQuery}
                      onChange={(e) => {
                        setCarQuery(e.target.value);
                        setShowCarDropdown(true);
                      }}
                      onFocus={() => setShowCarDropdown(true)}
                    />
                    
                    <AnimatePresence>
                      {showCarDropdown && (carSuggestions.length > 0 || isSearchingCars) && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute left-0 right-0 top-[100%] mt-2 max-h-48 overflow-y-auto bg-[#1A1A1A] border border-white/10 z-[1005] flex flex-col shadow-2xl rounded-lg"
                        >
                          {isSearchingCars ? (
                             <div className="px-4 py-3 text-xs text-white/40 animate-pulse">Loading dataset...</div>
                          ) : (
                             carSuggestions.map((suggestion, idx) => (
                               <div 
                                 key={idx}
                                 className="px-4 py-3 text-xs text-white hover:bg-brand-orange/10 hover:text-brand-orange cursor-pointer border-b border-white/5 last:border-none uppercase tracking-wide"
                                 onClick={() => {
                                   setCarQuery(suggestion);
                                   setShowCarDropdown(false);
                                 }}
                               >
                                 {suggestion}
                               </div>
                             ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-2 px-1">Service Type</label>
                    <select 
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/5 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors appearance-none cursor-pointer" 
                      required
                    >
                      {availableServices.map((service, idx) => (
                        <option key={idx} value={service} className="bg-[#111111] text-white">{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-2 px-1">Preferred Date</label>
                      <input type="date" className="w-full bg-[#1A1A1A] border border-white/5 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors appearance-none" required />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-2 px-1">Preferred Time</label>
                      <input type="time" className="w-full bg-[#1A1A1A] border border-white/5 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors appearance-none" required />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button type="submit" className="w-full bg-brand-orange hover:bg-white text-black font-bold uppercase tracking-wider text-sm px-6 py-4 transition-colors duration-300 shadow-[0_0_20px_rgba(246,150,33,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                      Confirm Reservation
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>

      </main>
      <Footer />
    </>
  );
}
