"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const heroData = {
  // Using a more suitable structural image similar to the mockup
  image:
    "https://i.pinimg.com/1200x/30/c3/9a/30c39a79a995dc0e599004c204af08f6.jpg",
  lgimage:
    "https://i.pinimg.com/1200x/cd/e5/3b/cde53b4246989d18ff20f63d5675a424.jpg",
  title: "Innovative Solutions\nFor Automobile",
  cta: "VIEW SERVICE",
};

const Hero = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  return (
    <section className="relative w-full pt-16 px-0 md:px-0">
      <div className="relative h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] w-full overflow-hidden bg-[#050505] group">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background Image with Slow Zoom */}
            <motion.img
              src={isLargeScreen ? heroData.lgimage : heroData.image}
              alt={heroData.title}
              className="w-full h-full object-cover object-center md:object-right"
              animate={{ scale: [1.05, 1] }}
              transition={{ duration: 8, ease: "easeOut" }}
            />

            {/* Linear Graident Overlay simulating the architecture depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent w-full md:w-[70%]" />
            <div className="absolute inset-0 bg-black/10" />

            {/* Content Sidebar */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-24">
              <div className="max-w-2xl overflow-hidden">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white capitalize leading-[1.1] mb-8 whitespace-pre-line">
                    {heroData.title}
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Link href="/services" className="inline-block border border-white bg-transparent hover:bg-white hover:text-black text-white font-medium uppercase text-[10px] md:text-[11px] tracking-widest px-8 md:px-10 py-3 md:py-4 transition-colors duration-300">
                    {heroData.cta}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
