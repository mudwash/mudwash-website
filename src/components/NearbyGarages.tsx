'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Loader2 } from 'lucide-react';
import { getGarages, Garage } from '@/lib/garages';

const NearbyGarages = () => {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const data = await getGarages();
        setGarages(data);
      } catch (error) {
        console.error("Error fetching garages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGarages();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-brand-orange animate-spin" size={32} />
        <p className="text-white/20 text-xs font-black uppercase tracking-widest">Scanning Nearby Garages...</p>
      </div>
    );
  }

  if (garages.length === 0) return null;

  return (
    <section className="py-8 px-6 pb-32">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Nearby Garages</h2>
        <button className="text-brand-orange text-xs font-bold uppercase tracking-wider">See All</button>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
        {garages.map((garage, index) => (
          <motion.div
            key={garage.id || index}
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
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{garage.name}</h3>
                  {garage.location && <span className="text-[9px] text-white/30 font-medium uppercase tracking-widest mt-0.5">{garage.location}</span>}
                </div>
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
