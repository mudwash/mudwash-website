"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#050505]" />}>
      <SignInContent />
    </Suspense>
  );
}

function SignInContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const isAdmin = userCredential.user.email === "wazeert13@gmail.com";
      
      if (isAdmin) {
        localStorage.setItem("admin_token", "mudwash_session_active");
        router.push(returnTo || "/admin");
      } else {
        router.push(returnTo || "/");
      }
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Welcome <br /> Back<span className="text-brand-orange">.</span>
            </h1>
            <p className="text-white/40 text-sm mt-3">Sign in securely to manage your bookings and access premium detailing packages.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <form className="space-y-6" onSubmit={handleSignIn}>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-lg font-bold"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-5">
                {/* Email Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none text-white/20 group-focus-within:text-brand-orange transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-3 h-3 rounded-sm border border-white/20 bg-transparent peer-checked:bg-brand-orange peer-checked:border-brand-orange transition-all flex items-center justify-center">
                       <svg className="w-2 h-2 text-black opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-[11px] uppercase tracking-wider text-brand-orange hover:text-white transition-colors font-bold">
                  Forgot Password?
                </Link>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-extrabold uppercase tracking-widest text-xs py-5 rounded-none hover:bg-brand-orange transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Signing In...
                    </>
                  ) : "Sign In"}
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-col gap-5 border-t border-white/5 pt-6">
              <p className="text-white/40 text-sm">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-white hover:text-brand-orange font-bold transition-colors">
                  Create Account
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
          src="https://i.pinimg.com/736x/68/21/09/68210976b8b17b47c6df837ef176aed7.jpg"
          alt="Luxury Car Detail"
          className="w-full h-full object-cover filter brightness-[0.8]"
        />
        {/* Inner shadow overlay matching left panel background perfectly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent opacity-50" />
      </div>

    </main>
  );
}
