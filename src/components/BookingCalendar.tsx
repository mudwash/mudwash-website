"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Helper to generate the exact next N days (including weekends)
function getWorkingDays(numDays = 7) {
  const days = [];
  const cur = new Date();
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let added = 0;
  cur.setHours(0, 0, 0, 0); // normalize time

  while (added < numDays) {
    const dayOfWeek = cur.getDay();
    days.push({
      id: cur.getTime().toString(),
      day: cur.getDate().toString().padStart(2, '0'),
      name: weekDays[dayOfWeek],
      // If Sunday (0), no time slots. Otherwise standard slots.
      slots: dayOfWeek === 0 ? [] : ["11:00 am", "3:00 pm", "7:00 pm"],
    });
    added++;
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

export default function BookingCalendar() {
  const [schedule, setSchedule] = useState<{id: string, day: string, name: string, slots: string[]}[]>([]);
  const [selectedDayId, setSelectedDayId] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    // Generate dates on client to prevent hydration mismatch
    const days = getWorkingDays();
    setSchedule(days);
    if (days.length > 0) {
      setSelectedDayId(days[0].id);
    }
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#050505] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2500&auto=format&fit=crop" 
          alt="Rain texture" 
          className="w-full h-full object-cover filter grayscale contrast-150 brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* Headers */}
        <div className="text-center mb-16">
          <p className="text-brand-orange uppercase tracking-[0.3em] text-[10px] font-black mb-3">STEP 04</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">Date and Time</h2>
          <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed font-medium">
            Booking time slots are subject to availability. Final<br className="hidden sm:block"/> confirmation will be shared after review
          </p>
        </div>

        {/* Calendar Grid Container */}
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
          <div className="flex flex-col w-max min-w-full">
            
            {/* Header Row */}
            <div className="flex w-full bg-[#1A1A1A]/90 backdrop-blur-md border-y border-white/5 shadow-2xl">
              {schedule.map((col, idx) => (
                <div 
                  key={col.id}
                  onClick={() => setSelectedDayId(col.id)}
                  className="w-[14.28vw] min-w-[120px] flex flex-col items-center justify-center py-10 border-r border-white/5 last:border-0 min-h-[160px] transition-all cursor-pointer hover:bg-white/[0.02] shrink-0 snap-start"
                >
                  {selectedDayId === col.id ? (
                    <motion.div 
                      layoutId="activeDay"
                      className="bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                       <span className="text-3xl font-black text-black leading-none mb-1">{col.day}</span>
                       <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider">{col.name}</span>
                    </motion.div>
                  ) : (
                    <div className="w-24 h-24 flex flex-col items-center justify-center opacity-40">
                       <span className="text-3xl font-black text-white/40 leading-none mb-1">
                          {col.day}
                       </span>
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider">
                          {col.name}
                       </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Time Slots Row */}
            <div className="flex w-full mt-12 bg-transparent">
              {schedule.map((col, idx) => (
                <div key={col.id} className="w-[14.28vw] min-w-[120px] flex flex-col items-center gap-10 py-4 shrink-0">
                  {col.slots.length === 0 ? (
                     <div className="text-brand-orange/40 text-[10px] uppercase tracking-[0.2em] font-black mt-4">CLOSED</div>
                  ) : (
                     col.slots.map((slot, sIdx) => {
                        const isSelected = selectedDayId === col.id && selectedSlot === slot;
                        return (
                           <div 
                              key={sIdx}
                              onClick={() => {
                                 setSelectedDayId(col.id);
                                 setSelectedSlot(slot);
                              }}
                              className={`cursor-pointer transition-all duration-300 text-center w-full ${
                                isSelected 
                                  ? 'text-brand-orange font-black scale-125' 
                                  : 'text-white/90 hover:text-white text-base font-black tracking-tight'
                              }`}
                           >
                              {slot}
                           </div>
                        )
                     })
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
