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
          className="w-full h-full object-cover filter grayscale contrast-125 brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/40" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* Headers */}
        <div className="text-center mb-10">
          <p className="text-brand-orange uppercase tracking-widest text-[11px] font-black mb-3">STEP 04</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Date and Time</h2>
          <p className="text-white/70 text-sm max-w-lg mx-auto leading-relaxed">
            Booking time slots are subject to availability. Final<br className="hidden sm:block"/> confirmation will be shared after review
          </p>
        </div>

        {/* Calendar Grid Container */}
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
          <div className="flex flex-col w-max min-w-full">
            
            {/* Header Row */}
            <div className="flex w-full bg-[#3D3D3D]/95 backdrop-blur-sm border-b border-[#2A2A2A] rounded-t-sm shadow-2xl">
              {schedule.map((col, idx) => (
                <div 
                  key={col.id}
                  onClick={() => setSelectedDayId(col.id)}
                  className="w-[33.33vw] sm:w-[25vw] md:w-auto md:flex-1 flex flex-col items-center justify-center py-6 border-r border-[#2A2A2A]/50 last:border-0 min-h-[140px] transition-colors cursor-pointer hover:bg-white/5 shrink-0 snap-start"
                >
                  {selectedDayId === col.id ? (
                    <motion.div 
                      layoutId="activeDay"
                      className="bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg"
                    >
                       <span className="text-[28px] font-black text-black leading-tight">{col.day}</span>
                       <span className="text-[11px] font-black text-brand-orange capitalize">{col.name}</span>
                    </motion.div>
                  ) : (
                    <div className="w-24 h-24 flex flex-col items-center justify-center">
                       <span className={`text-[26px] font-black leading-tight transition-colors text-[#1A1A1A] drop-shadow-md`}>
                          {col.day}
                       </span>
                       <span className={`text-[11px] font-black capitalize mt-1 transition-colors text-[#1A1A1A] drop-shadow-md`}>
                          {col.name}
                       </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Time Slots Row */}
            <div className="flex w-full mt-6 bg-transparent">
              {schedule.map((col, idx) => (
                <div key={col.id} className="w-[33.33vw] sm:w-[25vw] md:w-auto md:flex-1 flex flex-col items-center gap-7 py-4 shrink-0">
                  {col.slots.length === 0 ? (
                     <div className="text-white/30 text-xs uppercase tracking-widest font-bold mt-2">Closed</div>
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
                              className={`cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
                                isSelected 
                                  ? 'text-brand-orange font-bold scale-110 bg-black/40 px-3 py-1 rounded-md backdrop-blur-sm' 
                                  : 'text-white hover:text-brand-orange text-sm font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
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
