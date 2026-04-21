"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";

const servicesData = [
  {
    name: "Exterior detailing",
    image:
      "https://i.pinimg.com/736x/c7/46/b6/c746b633f4db61206a88a95005e67835.jpg",
  },
  {
    name: "Interior cleaning",
    image:
      "https://i.pinimg.com/1200x/3f/3f/79/3f3f796456755cc7e75a9d0af42fdef1.jpg",
  },
  {
    name: "Wheel shining",
    image:
      "https://i.pinimg.com/736x/66/2e/18/662e1831b4d35b115175d23e238a0539.jpg",
  },
  {
    name: "Leather conditioning",
    image:
      "https://i.pinimg.com/1200x/be/bd/03/bebd03cfbb1d34bb910f5d018f2c8556.jpg",
  },
  {
    name: "Engine cleaning",
    image:
      "https://i.pinimg.com/1200x/1b/a9/e6/1ba9e6c2bb72277fbd05b0b76255e54d.jpg",
  },
  {
    name: "Paint correction",
    image:
      "https://i.pinimg.com/736x/f6/77/52/f6775295ff65933c2c0084728d66cb26.jpg",
  },
];

const ServicesGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  return (
    <section className="py-16 px-6 bg-[#050505] w-full border-t border-white/5">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <span className="text-brand-orange text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] mb-3 block">
              Detailing Service
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight max-w-lg">
              Transform your car with our high-quality detailing service.
            </h2>
          </div>
          <Link
            href="/services"
            className="border border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 hover:text-brand-orange text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-8 py-3 transition-all duration-300"
          >
            See All
          </Link>
        </div>

        {/* Grid mapping: shows 2 columns on mobile (4 total items via CSS hidden), 3 on large (all 6) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative aspect-[4/3] rounded bg-[#1A1A1A] overflow-hidden group cursor-pointer ${index >= 4 ? "hidden lg:block" : ""}`}
              onClick={() => {
                setSelectedService(service.name);
                setIsModalOpen(true);
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
