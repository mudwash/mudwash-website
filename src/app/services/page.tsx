"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const allServicesData = [
  {
    name: "General Service",
    image:
      "https://i.pinimg.com/1200x/c6/cc/8a/c6cc8afcad09287f9b6356bd19e6f081.jpg",
    category: "general",
  },
  {
    name: "Oil Change",
    image:
      "https://i.pinimg.com/1200x/c4/98/2c/c4982cc85c46a58e4f00bd9bf53284e2.jpg",
    category: "general",
  },
  {
    name: "Battery Replacement",
    image:
      "https://i.pinimg.com/1200x/30/25/a4/3025a43cd85187ae9fd71dbf592cfd51.jpg",
    category: "general",
  },
  {
    name: "Brake Service",
    image:
      "https://i.pinimg.com/1200x/06/2d/b3/062db3d9baaf58a130130ecd701f24ee.jpg",
    category: "general",
  },
  {
    name: "AC Check & Gas",
    image:
      "https://i.pinimg.com/1200x/96/2c/04/962c041629bf7d3016003bb6b4c1d925.jpg",
    category: "general",
  },
  {
    name: "Premium Wash",
    image:
      "https://i.pinimg.com/1200x/1d/cf/8f/1dcf8f3a2fefeb9637eabe516b5574a6.jpg",
    category: "general",
  },
  {
    name: "Engine Tuning",
    image:
      "https://i.pinimg.com/1200x/84/38/d5/8438d5f961cd837c4f72fa7a06a325d0.jpg",
    category: "general",
  },

  {
    name: "Suspension",
    image:
      "https://i.pinimg.com/736x/e9/a2/78/e9a278f93e8aa08785a7754326648499.jpg",
    category: "general",
  },
  {
    name: "Alignment Checking",
    image:
      "https://i.pinimg.com/736x/b9/58/04/b9580485cedc42c46c86b0c90b51fe52.jpg",
    category: "general",
  },
  {
    name: "Paint & Body",
    image:
      "https://i.pinimg.com/1200x/e4/d6/7b/e4d67b9a3b80fc6c17da4a454f637ef8.jpg",
    category: "general",
  },
  {
    name: "Inspections",
    image:
      "https://i.pinimg.com/1200x/35/04/9b/35049b606164092c08061836981df2e0.jpg",
    category: "general",
  },
  {
    name: "Ceramic Coating",
    image:
      "https://i.pinimg.com/1200x/d6/4a/6a/d64a6a6fdc465a152d31359fe2a995e6.jpg",
    category: "detailing",
  },

  {
    name: "Exterior detailing",
    image:
      "https://i.pinimg.com/736x/c7/46/b6/c746b633f4db61206a88a95005e67835.jpg",
    category: "detailing",
  },
  {
    name: "Interior cleaning",
    image:
      "https://i.pinimg.com/1200x/3f/3f/79/3f3f796456755cc7e75a9d0af42fdef1.jpg",
    category: "detailing",
  },
  {
    name: "Wheel shining",
    image:
      "https://i.pinimg.com/736x/66/2e/18/662e1831b4d35b115175d23e238a0539.jpg",
    category: "detailing",
  },
  {
    name: "Leather conditioning",
    image:
      "https://i.pinimg.com/1200x/be/bd/03/bebd03cfbb1d34bb910f5d018f2c8556.jpg",
    category: "detailing",
  },
  {
    name: "Engine cleaning",
    image:
      "https://i.pinimg.com/1200x/1b/a9/e6/1ba9e6c2bb72277fbd05b0b76255e54d.jpg",
    category: "detailing",
  },
  {
    name: "Paint correction",
    image:
      "https://i.pinimg.com/736x/f6/77/52/f6775295ff65933c2c0084728d66cb26.jpg",
    category: "detailing",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {allServicesData.map((service, index) => (
                <motion.div
                  key={service.name}
                  variants={itemVariants}
                  className="relative aspect-[4/3] rounded bg-[#1A1A1A] overflow-hidden group cursor-pointer"
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
          </motion.div>
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
