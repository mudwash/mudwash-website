'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

const BookingModal = ({ isOpen, onClose, serviceName }: BookingModalProps) => {
  const [carQuery, setCarQuery] = useState("");
  const [carSuggestions, setCarSuggestions] = useState<string[]>([]);
  const [isSearchingCars, setIsSearchingCars] = useState(false);
  const [showCarDropdown, setShowCarDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [allCars, setAllCars] = useState<string[]>([]);

  // Clear state on open/close
  useEffect(() => {
    if (!isOpen) {
      setCarQuery("");
      setShowCarDropdown(false);
      setCarSuggestions([]);
    }
  }, [isOpen]);

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

  // Fetch the local indian cars dataset once when the modal opens
  useEffect(() => {
    if (isOpen && allCars.length === 0) {
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
    }
  }, [isOpen, allCars.length]);

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

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[1001] flex items-center justify-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-[#111111] border border-white/10 p-6 shadow-2xl relative pointer-events-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-brand-orange transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight">Book Service</h2>
              <p className="text-white/60 text-xs mb-6">
                Provide your details below to schedule your <span className="text-brand-orange font-bold">{serviceName}</span> appointment.
              </p>

              <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onClose(); alert('Booking Confirmed!'); }}>
                <div>
                  <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-1 px-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#1A1A1A] border border-white/5 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors" required />
                </div>
                
                <div>
                  <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-1 px-1">Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#1A1A1A] border border-white/5 text-white px-4 py-3 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors" required />
                </div>

                <div className="relative" ref={dropdownRef}>
                  <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-1 px-1">Vehicle Model</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Honda Civic" 
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
                        className="absolute left-0 right-0 top-[100%] mt-1 max-h-48 overflow-y-auto bg-[#1A1A1A] border border-white/10 z-[1005] flex flex-col shadow-2xl"
                      >
                        {isSearchingCars ? (
                           <div className="px-4 py-3 text-xs text-white/40 animate-pulse">Searching models...</div>
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
                  <label className="block text-[10px] text-white/40 uppercase tracking-wider mb-1 px-1">Service Type</label>
                  <input type="text" value={serviceName} readOnly className="w-full bg-[#1A1A1A] border border-white/5 text-brand-orange px-4 py-3 text-sm focus:outline-none cursor-not-allowed" />
                </div>

                <div className="mt-2">
                  <button type="submit" className="w-full bg-brand-orange hover:bg-white text-black font-bold uppercase tracking-wider text-xs px-6 py-4 transition-colors">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
