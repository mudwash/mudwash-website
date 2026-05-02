"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Link from "next/link";
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
  
  // 1. Emoji / Single Char Detection
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

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices(true);
        setServices(data);
        if (data.length === 0) {
          console.warn("No active services found in the database.");
        }
      } catch (err: any) {
        console.error("Failed to fetch services:", err);
        setError(err.message || "Could not connect to the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>

      <main className="min-h-screen bg-[#111111] pt-20 md:pt-32 pb-24 px-6">
        <div className="w-full mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 text-left"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.9] max-w-2xl">
              Premium <span className="text-brand-orange">Auto Care</span> <br />
              Services & Detailing.
            </h1>
            <p className="text-white/40 text-sm md:text-base mt-4 max-w-xl font-medium">
              Transform your car with our complete range of premium detailing and high-performance maintenance services.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 className="animate-spin text-brand-orange" size={40} />
            </div>
          ) : error ? (
            <div className="text-center py-32 bg-red-500/5 rounded-3xl border border-red-500/10">
              <p className="text-red-500 font-bold mb-2">Backend Connection Error</p>
              <p className="text-white/40 text-sm mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl text-sm transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-32 bg-white/5 rounded-3xl border border-white/5">
              <p className="text-white font-bold mb-2">No Services Available</p>
              <p className="text-white/40 text-sm mb-6">We haven't listed any services yet. Check back soon!</p>
              <Link 
                href="/admin/services"
                className="text-brand-orange text-sm font-bold hover:underline"
              >
                Go to Admin Panel to add services →
              </Link>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    className="relative p-4 sm:p-7 rounded-[1.5rem] sm:rounded-[2.5rem] bg-[#1A1A1A] border border-white/5 overflow-hidden group cursor-pointer transition-all hover:bg-[#222222] hover:border-brand-orange/30 flex flex-col gap-3 sm:gap-5 shadow-2xl"
                    onClick={() => {
                      const user = auth.currentUser;
                      if (!user) {
                        router.push("/sign-in?returnTo=/services");
                      } else {
                        setSelectedService(service.name);
                        setIsModalOpen(true);
                      }
                    }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-2">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors shrink-0">
                        {getIconForService(service)}
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-brand-orange font-black text-sm sm:text-xl tracking-tighter leading-none">
                          ₹{service.price}
                        </div>
                        <div className="flex items-center justify-start sm:justify-end gap-1 text-white/30 text-[8px] sm:text-[9px] font-black uppercase tracking-widest mt-1">
                          <Clock size={8} />
                          {service.duration}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="text-white font-black text-sm sm:text-xl italic uppercase tracking-tight group-hover:text-brand-orange transition-colors leading-tight line-clamp-1">
                        {service.name}
                      </h3>
                      <p className="hidden sm:block text-white/40 text-[11px] leading-relaxed line-clamp-2 font-medium h-8">
                        {service.description || "Premium automotive care and professional treatment for your vehicle."}
                      </p>
                    </div>

                    <div className="mt-auto pt-3 sm:pt-5 flex items-center justify-between border-t border-white/5">
                      <span className="text-[8px] sm:text-[9px] text-white/20 uppercase font-black tracking-[0.2em] group-hover:text-white/40 transition-colors">Book Now</span>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-black transition-all transform group-hover:scale-110">
                        <Zap size={14} />
                      </div>
                    </div>

                    {/* Radial Glow */}
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-orange/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />
    </>
  );
}
