"use client";

import { motion } from "framer-motion";

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="relative w-16 h-16">
        <motion.div 
          className="absolute inset-0 border-4 border-brand-orange/20 rounded-full"
        />
        <motion.div 
          className="absolute inset-0 border-4 border-t-brand-orange rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-white/40 text-xs font-bold uppercase tracking-widest"
      >
        Loading Admin Panel...
      </motion.p>
    </div>
  );
}
