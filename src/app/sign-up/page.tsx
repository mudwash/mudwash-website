"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="h-screen w-full bg-[#050505] text-white flex overflow-hidden">
      
      {/* LEFT PANEL - FORM */}
      <div className="w-full lg:w-[45%] h-full z-10 flex flex-col justify-center px-8 md:px-16 xl:px-24 bg-[#0A0A0A] relative border-r border-white/5">
        
        {/* Subtle elegant ambient glow */}
        <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-brand-orange/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="w-full max-w-md mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10"
          >
            <div className="text-2xl font-black tracking-tighter flex items-baseline mb-4">
              <span className="text-brand-orange italic">MUD</span>
              <span className="text-white italic">WASH</span>
              <div className="w-1.5 h-1.5 bg-brand-orange ml-1 rounded-full" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2 leading-tight">
              Create an <br /> Account<span className="text-brand-orange">.</span>
            </h1>
            <p className="text-white/40 text-sm mt-3">Unlock exclusive booking privileges and ultra-premium automotive detailing offers.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              
              {/* Name Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none text-white/20 group-focus-within:text-brand-orange transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-9 pr-4 text-white md:text-lg focus:outline-none focus:border-brand-orange transition-all placeholder:text-white/20"
                  placeholder="Full Name"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none text-white/20 group-focus-within:text-brand-orange transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-9 pr-4 text-white md:text-lg focus:outline-none focus:border-brand-orange transition-all placeholder:text-white/20"
                  placeholder="Email Address"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none text-white/20 group-focus-within:text-brand-orange transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-9 pr-12 text-white md:text-lg focus:outline-none focus:border-brand-orange transition-all placeholder:text-white/20"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-white/20 hover:text-brand-orange transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-white text-black font-extrabold uppercase tracking-widest text-xs py-5 rounded-none hover:bg-brand-orange transition-all duration-300"
                >
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-col gap-5">
              <p className="text-white/40 text-sm">
                Already registered?{" "}
                <Link href="/sign-in" className="text-white hover:text-brand-orange font-bold transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* RIGHT PANEL - IMAGE */}
      <div className="hidden lg:block lg:w-[55%] h-full relative group">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Car Detail"
          className="w-full h-full object-cover filter brightness-[0.8]"
        />
        {/* Inner shadow overlay matching left panel background perfectly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent opacity-50" />
      </div>

    </main>
  );
}
