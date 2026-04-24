"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
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
      <Navbar />
      <main className="min-h-screen bg-[#111111] pt-32 pb-32 px-6">
        <div className="w-full mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-left"
          >
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
              Transform your car with our complete range of premium detailing
              and maintenance services.
            </h1>
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
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    className="relative aspect-square md:aspect-[4/3] rounded-3xl bg-[#1A1A1A] border border-white/5 overflow-hidden group cursor-pointer flex flex-col items-center justify-center gap-4 transition-all hover:bg-[#222222]"
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
                    {/* Icon Container */}
                    <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-brand-orange/10 transition-colors">
                      {getIconForService(service)}
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-white font-bold text-xs md:text-sm lg:text-base tracking-wide z-10 transition-transform duration-300 group-hover:text-brand-orange">
                      {service.name}
                    </h3>

                    {/* Subtle Gradient Glow */}
                    <div className="absolute inset-0 bg-radial-gradient from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
