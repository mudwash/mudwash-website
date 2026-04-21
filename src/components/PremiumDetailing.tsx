"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Car, Beaker, SprayCan, Wrench } from "lucide-react";
import Link from "next/link";

export default function PremiumDetailing() {
  const features = [
    {
      icon: <Car size={36} strokeWidth={1.5} />,
      title: "On-Site Mobile Service",
      description:
        "We come fully equipped to your home or office, delivering professional car detailing without disrupting your schedule.",
    },
    {
      icon: <Beaker size={36} strokeWidth={1.5} />,
      title: "Premium-Grade Products",
      description:
        "Only trusted, high-quality detailing products are used to protect your paint, interior surfaces, and finishes.",
    },
    {
      icon: <SprayCan size={36} strokeWidth={1.5} />,
      title: "Attention to Every Detail",
      description:
        "From hard-to-reach areas to fine finishing touches, we ensure a deep clean that meets premium standards.",
    },
    {
      icon: <Wrench size={36} strokeWidth={1.5} />,
      title: "Skilled Detailing Experts",
      description:
        "Our trained technicians use proven techniques to safely restore, clean, and enhance every part of your vehicle.",
    },
  ];

  return (
    <section className="w-full bg-[#050505] text-white py-16 lg:py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top Section: Split Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col items-start pr-0 lg:pr-10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[1px] bg-brand-orange"></div>
              <span className="text-brand-orange text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase">
                Modern Equipment
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Premium Car Detailing at Your Doorstep
            </h2>

            <p className="text-white/60 font-medium text-sm sm:text-base leading-relaxed mb-8">
              Whether you're short on time or simply love convenience, our{" "}
              <strong className="text-white">mobile car detailing</strong>{" "}
              brings top-tier cleaning right to your doorstep. From a quick
              exterior wash to deep interior detailing, we use only{" "}
              <strong className="text-white">high-quality</strong> and expert
              techniques to give your car the care it deserves.
            </p>

            <div className="mb-10">
              <p className="text-xl sm:text-3xl font-bold text-white border-l-4 border-brand-orange pl-4">
                Call for book: <span className="font-black">+971502374199</span>
              </p>
            </div>

            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#f69621] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#d98018] transition-colors group"
            >
              Book Now
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px]  overflow-hidden drop-shadow-xl"
          >
            {/* Dark overlay just like the image reference slightly */}
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img
              src="https://i.pinimg.com/1200x/31/5b/d2/315bd25368761d7af69e50b330faede5.jpg"
              alt="Premium Car Detailing"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Bottom Section: Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 pt-16 border-t border-white/10 gap-8 lg:gap-0">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col items-center text-center px-4 sm:px-8 ${
                idx !== features.length - 1 ? "lg:border-r border-white/10" : ""
              }`}
            >
              <div className="text-brand-orange mb-6 bg-brand-orange/10 p-4 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-lg font-black text-white mb-4 h-auto lg:h-[56px] flex items-center justify-center">
                {feature.title}
              </h3>
              <p className="text-white/60 font-medium text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
