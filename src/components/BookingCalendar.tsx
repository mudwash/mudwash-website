"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronRight, ChevronLeft } from 'lucide-react';

// Helper to generate the exact next N days
export default function BookingCalendar() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [selectedDayId, setSelectedDayId] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to generate the exact next N days
  const getWorkingDays = (numDays = 14) => {
    const days = [];
    const cur = new Date();
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    cur.setHours(0, 0, 0, 0);

    for (let i = 0; i < numDays; i++) {
      const dayOfWeek = cur.getDay();
      days.push({
        id: cur.getTime().toString(),
        date: new Date(cur.getTime()),
        day: cur.getDate().toString().padStart(2, '0'),
        month: months[cur.getMonth()],
        name: weekDays[dayOfWeek],
        fullDate: cur.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        // Sunday is closed, others have slots
        slots: dayOfWeek === 0 ? [] : ["11:00 am", "1:00 pm", "3:00 pm", "5:00 pm", "7:00 pm", "9:00 pm"],
      });
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  };

  useEffect(() => {
    const days = getWorkingDays();
    setSchedule(days);
    if (days.length > 0) {
      setSelectedDayId(days[0].id);
    }
  }, []);

  const selectedDay = schedule.find(d => d.id === selectedDayId);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <>
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2500&auto=format&fit=crop" 
          alt="Rain texture" 
          className="w-full h-full object-cover filter grayscale contrast-150 brightness-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-brand-orange/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-12 h-[1px] bg-brand-orange" />
              <p className="text-brand-orange uppercase tracking-[0.4em] text-[10px] font-black">STEP 04</p>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter"
            >
              Select <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Date & Time</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm md:text-base max-w-sm leading-relaxed font-medium md:text-right"
          >
            Choose your preferred window. Final confirmation will be sent after our team reviews the schedule.
          </motion.p>
        </div>

        {/* Date Selector */}
        <div className="relative mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center gap-3 text-white/80 font-bold tracking-tight">
              <Calendar className="w-5 h-5 text-brand-orange" />
              Available Dates
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {schedule.map((day) => (
              <motion.div
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 w-32 md:w-40 snap-start cursor-pointer group`}
              >
                <div className={`relative p-6 rounded-3xl border transition-all duration-500 overflow-hidden ${
                  selectedDayId === day.id 
                    ? 'bg-white border-white shadow-[0_20px_40px_rgba(255,255,255,0.15)]' 
                    : 'bg-white/5 border-white/5 hover:border-white/20 backdrop-blur-xl'
                }`}>
                  {/* Highlight for unselected */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${selectedDayId === day.id ? 'hidden' : ''}`} />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className={`text-xs font-black uppercase tracking-widest mb-1 ${
                      selectedDayId === day.id ? 'text-brand-orange' : 'text-white/40 group-hover:text-white/60'
                    }`}>
                      {day.name.substring(0, 3)}
                    </span>
                    <span className={`text-4xl font-black mb-1 ${
                      selectedDayId === day.id ? 'text-black' : 'text-white group-hover:scale-110 transition-transform'
                    }`}>
                      {day.day}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                      selectedDayId === day.id ? 'text-black/40' : 'text-white/20'
                    }`}>
                      {day.month}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Time Selector */}
        <AnimatePresence mode="wait">
          {selectedDay && (
            <motion.div
              key={selectedDayId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/[0.03] border border-white/5 backdrop-blur-2xl rounded-[40px] p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-black tracking-tight">{selectedDay.fullDate}</h4>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Select your preferred time slot</p>
                  </div>
                </div>
                {selectedDay.slots.length === 0 && (
                  <span className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                    Closed for Bookings
                  </span>
                )}
              </div>

              {selectedDay.slots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {selectedDay.slots.map((slot: string) => (
                    <motion.button
                      key={slot}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={`relative py-5 px-4 rounded-2xl font-black text-sm tracking-tight transition-all duration-300 overflow-hidden ${
                        selectedSlot === slot
                          ? 'bg-brand-orange text-black shadow-[0_10px_25px_rgba(255,102,0,0.3)]'
                          : 'bg-white/5 text-white/60 border border-white/5 hover:border-brand-orange/50 hover:text-white'
                      }`}
                    >
                      {slot}
                      {selectedSlot === slot && (
                        <motion.div 
                          layoutId="slotGlow"
                          className="absolute inset-0 bg-white/20 blur-xl rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                   <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                      <Clock className="w-10 h-10 text-white/10" />
                   </div>
                   <p className="text-white/20 font-bold uppercase tracking-widest text-sm">No available slots for this day</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    
    {/* Selected Summary Footer - Sticky at bottom, outside section to avoid overflow/transform issues */}
    <AnimatePresence>
      {selectedDayId && selectedSlot && (
         <motion.div 
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 100 }}
           className="fixed bottom-24 md:bottom-10 left-0 right-0 z-[9999] flex justify-center px-4 md:px-6 pointer-events-none"
         >
            <div className="inline-flex items-center gap-3 md:gap-8 px-5 md:px-10 py-3 md:py-4 bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden relative group pointer-events-auto border border-black/5 max-w-[95vw] md:max-w-none">
               {/* Background pulse effect */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 bg-brand-orange"
               />
               
               <div className="relative z-10 flex flex-col min-w-0">
                  <span className="text-[7px] md:text-[10px] font-black text-black/40 uppercase tracking-widest leading-none mb-1">Appointment</span>
                  <span className="text-black font-black leading-none text-xs md:text-base truncate">
                    {selectedDay?.name.substring(0, 3)}, {selectedSlot}
                  </span>
               </div>
               
               <div className="relative z-10 w-[1px] h-6 md:h-8 bg-black/10" />
               
               <button 
                onClick={() => {
                  const contactForm = document.getElementById('booking-contact-form');
                  if (contactForm) {
                    const offset = 100;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = contactForm.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="relative z-10 flex items-center gap-2 group-hover:gap-3 md:group-hover:gap-4 transition-all duration-300"
               >
                  <span className="text-black font-black uppercase text-[9px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap">Next Step</span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center group-hover:bg-brand-orange transition-colors duration-300 flex-shrink-0">
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
               </button>
            </div>
         </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
