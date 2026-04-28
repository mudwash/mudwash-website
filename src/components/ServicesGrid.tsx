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
  Clock,
  Search,
  Sparkles,
  Settings2,
  Activity,
  Layers
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
  Clock,
  Search,
  Sparkles,
  Settings2,
  Activity,
  Layers
};

const getIconForService = (service: Service) => {
  const name = service.name.toLowerCase();
  const iconField = (service.icon || "").toLowerCase();
  const source = `${name} ${iconField}`;

  // 1. Smart Keyword Detection (Prioritized for better look)
  if (source.includes("inspection") || source.includes("checkup")) return <Search className="text-[#A0C2C2]" size={32} />;
  if (source.includes("suspension") || source.includes("spring") || source.includes("shock")) return <Activity className="text-brand-orange" size={32} />;
  if (source.includes("checking") || source.includes("service check")) return <ShieldCheck className="text-[#32CD32]" size={32} />;
  if (source.includes("ceramic") || source.includes("coating") || source.includes("polish")) return <Sparkles className="text-[#FFD700]" size={32} />;
  if (source.includes("wash") || source.includes("clean") || source.includes("exterior")) return <Waves className="text-[#00BFFF]" size={32} />;
  if (source.includes("oil") || source.includes("fluid")) return <Droplets className="text-[#FF4D4D]" size={32} />;
  if (source.includes("battery") || source.includes("power") || source.includes("zap")) return <Zap className="text-[#FFD700]" size={32} />;
  if (source.includes("ac") || source.includes("air") || source.includes("cool")) return <Snowflake className="text-[#40E0D0]" size={32} />;
  if (source.includes("brake") || source.includes("stop")) return <Disc className="text-[#FF0000]" size={32} />;
  if (source.includes("engine") || source.includes("tune") || source.includes("motor")) return <Settings2 className="text-brand-orange" size={32} />;
  if (source.includes("interior") || source.includes("car") || source.includes("seat")) return <Car className="text-[#DA70D6]" size={32} />;
  if (source.includes("gear") || source.includes("clutch") || source.includes("system")) return <Settings className="text-[#32CD32]" size={32} />;
  if (source.includes("paint") || source.includes("shield") || source.includes("protect")) return <ShieldCheck className="text-[#BA55D3]" size={32} />;
  if (source.includes("time") || source.includes("fast") || source.includes("clock")) return <Clock className="text-brand-orange" size={32} />;

  // 2. Emoji Detection (Fallback)
  const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
  if (emojiRegex.test(service.icon || "")) {
    return <span className="text-3xl">{service.icon}</span>;
  }

  // 3. Lucide Name Match
  const lucideMatch = Object.keys(IconMap).find(k => k.toLowerCase() === iconField);
  if (lucideMatch) {
    const IconComponent = IconMap[lucideMatch];
    return <IconComponent className="text-brand-orange" size={32} />;
  }

  return <Wrench className="text-brand-orange/50" size={32} />; // Default
};

const FALLBACK_SERVICES: Service[] = [
  { id: 'f1', name: "Exterior detailing", price: "AED 150", duration: "1.5h", category: "Washing", description: "Premium outside wash", active: true, icon: "Waves", image: "" },
  { id: 'f2', name: "Interior cleaning", price: "AED 200", duration: "2h", category: "Cleaning", description: "Deep inside cleaning", active: true, icon: "Car", image: "" },
  { id: 'f3', name: "Ceramic Coating", price: "AED 1200", duration: "6h", category: "Protection", description: "Nanotech protection", active: true, icon: "ShieldCheck", image: "" },
  { id: 'f4', name: "Engine cleaning", price: "AED 100", duration: "1h", category: "Washing", description: "Engine bay detail", active: true, icon: "Settings2", image: "" },
  { id: 'f5', name: "Paint correction", price: "AED 800", duration: "4h", category: "Polishing", description: "Fixing swirl marks", active: true, icon: "Sparkles", image: "" },
  { id: 'f6', name: "Leather conditioning", price: "AED 180", duration: "1.5h", category: "Interior", description: "Premium leather care", active: true, icon: "Layers", image: "" },
];

export default function ServicesGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Safety timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.warn("ServicesGrid: Fetching services timed out, using fallback data.");
        setServices(FALLBACK_SERVICES);
        setLoading(false);
      }
    }, 5000);

    const fetchServices = async () => {
      try {
        const data = await getServices(true);
        if (isMounted) {
          if (data && data.length > 0) {
            setServices(data);
          } else {
            setServices(FALLBACK_SERVICES);
          }
        }
      } catch (error: any) {
        console.error("ServicesGrid: Error fetching services:", error);
        if (isMounted) setServices(FALLBACK_SERVICES);
      } finally {
        if (isMounted) {
          setLoading(false);
          clearTimeout(timeoutId);
        }
      }
    };

    fetchServices();
    return () => { 
      isMounted = false; 
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="pt-0 pb-12 md:py-12 px-4 md:px-6 bg-[#0A0A0A] w-full">
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
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 pb-4 md:pb-0">
            {services.slice(0, 8).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex flex-col items-center gap-2 group cursor-pointer w-full"
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

