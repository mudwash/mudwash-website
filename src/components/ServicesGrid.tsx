"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import { getServices, Service } from "@/lib/services";
import { 
  Loader2, 
  Droplets, 
  Zap, 
  Snowflake, 
  Waves, 
  Wrench, 
  Settings, 
  Disc, 
  Car,
  ShieldCheck,
  Clock
} from "lucide-react";

const IconMap: Record<string, React.ElementType> = {
  Droplets, 
  Zap, 
  Snowflake, 
  Waves, 
  Wrench, 
  Settings, 
  Disc, 
  Car,
  ShieldCheck,
  Clock
};

const getIconForService = (service: Service) => {
  const iconSource = (service.icon || service.name).toLowerCase();
  
  // 1. Emoji Detection
  const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
  if (emojiRegex.test(service.icon || "")) {
    return <span className="text-3xl">{service.icon}</span>;
  }

  // 2. Lucide Name Match
  const lucideMatch = Object.keys(IconMap).find(k => k.toLowerCase() === iconSource);
  if (lucideMatch) {
    const IconComponent = IconMap[lucideMatch];
    return <IconComponent className="text-brand-orange" size={32} />;
  }

  // 3. Smart Keyword Detection
  if (iconSource.includes("wash") || iconSource.includes("clean") || iconSource.includes("exterior")) return <Waves className="text-[#00BFFF]" size={32} />;
  if (iconSource.includes("oil") || iconSource.includes("fluid")) return <Droplets className="text-[#FF4D4D]" size={32} />;
  if (iconSource.includes("battery") || iconSource.includes("power") || iconSource.includes("zap")) return <Zap className="text-[#FFD700]" size={32} />;
  if (iconSource.includes("ac") || iconSource.includes("air") || iconSource.includes("cool")) return <Snowflake className="text-[#40E0D0]" size={32} />;
  if (iconSource.includes("engine") || iconSource.includes("repair") || iconSource.includes("tune")) return <Wrench className="text-[#FFA500]" size={32} />;
  if (iconSource.includes("interior") || iconSource.includes("car") || iconSource.includes("seat")) return <Car className="text-[#DA70D6]" size={32} />;
  if (iconSource.includes("brake") || iconSource.includes("stop")) return <Disc className="text-[#FF0000]" size={32} />;
  if (iconSource.includes("gear") || iconSource.includes("clutch") || iconSource.includes("system")) return <Settings className="text-[#32CD32]" size={32} />;
  if (iconSource.includes("paint") || iconSource.includes("shield") || iconSource.includes("protect")) return <ShieldCheck className="text-[#BA55D3]" size={32} />;
  if (iconSource.includes("time") || iconSource.includes("fast") || iconSource.includes("clock")) return <Clock className="text-brand-orange" size={32} />;
  
  return <Wrench className="text-brand-orange/50" size={32} />; // Default
};

// Removed static servicesData as we are using Firebase services

const ServicesGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log("ServicesGrid: Fetching services...");
        const data = await getServices(true); // only active
        console.log("ServicesGrid: Received data:", data);
        setServices(data);
      } catch (error: any) {
        console.error("ServicesGrid: Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-12 px-4 md:px-6 bg-[#0A0A0A] w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl text-white font-bold tracking-tight">
            Top Services
          </h2>
          <Link
            href="/services"
            className="text-brand-orange text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            See All
          </Link>
        </div>

        {/* Grid mapping */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-orange" size={32} />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-white/60 text-sm mb-2">No active services found.</p>
            <Link href="/admin/services" className="text-brand-orange text-xs hover:underline">
              Add or Activate Services in Admin Panel →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-6">
            {services.slice(0, 8).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
                onClick={() => {
                  setSelectedService(service.name);
                  setIsModalOpen(true);
                }}
              >
                {/* Standardized Icon Box for all screens */}
                <div className="w-full aspect-square rounded-2xl bg-[#1C1C1E] flex items-center justify-center group-hover:bg-[#2C2C2E] transition-all duration-300 border border-white/5 group-hover:border-brand-orange/30 group-hover:shadow-[0_0_20px_rgba(255,102,0,0.1)] relative overflow-hidden">
                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 group-hover:scale-110 transition-transform">
                    {getIconForService(service)}
                  </div>
                </div>

                <span className="text-[10px] md:text-xs text-white/80 font-medium text-center truncate w-full px-1 group-hover:text-white transition-colors">
                  {service.name}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName={selectedService} 
      />
    </section>
  );
};

export default ServicesGrid;
