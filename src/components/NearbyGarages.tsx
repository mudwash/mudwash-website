'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const garages = [
  {
    name: 'Auto Precision Lab',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800',
    distance: '2.5 km',
  },
  {
    name: 'The Detail Shop',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800',
    distance: '3.1 km',
  },
];

const NearbyGarages = () => {
  return (
    <section className="py-8 px-6 pb-32">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Nearby Garages</h2>
        <button className="text-brand-orange text-xs font-bold uppercase tracking-wider">See All</button>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
        {garages.map((garage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex-shrink-0 w-[280px] bg-[#1A1A1A] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl snap-center group"
          >
            <div className="relative h-40">
              <img src={garage.image} alt={garage.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-brand-orange transition-colors">
                <Heart size={16} />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{garage.name}</h3>
                <span className="text-[10px] font-bold text-brand-orange">{garage.distance}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NearbyGarages;
