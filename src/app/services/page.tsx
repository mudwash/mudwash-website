"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { getServices, Service } from "@/lib/services";
import { Loader2 } from "lucide-react";

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

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getServices(true).then((data) => {
      setServices(data);
      setLoading(false);
    });
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
                    className="relative aspect-[4/3] rounded bg-[#1A1A1A] overflow-hidden group cursor-pointer"
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
                    {/* Background Image */}
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Bottom Dark Gradient for text legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

                    {/* Hover highlight ring */}
                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors pointer-events-none rounded" />

                    {/* Text */}
                    <h3 className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 text-white font-medium text-xs md:text-sm lg:text-base tracking-wide z-10 transition-transform duration-300 group-hover:-translate-y-1">
                      {service.name}
                    </h3>
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
