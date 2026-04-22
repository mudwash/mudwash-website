"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { saveUserToFirestore } from "@/lib/users";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#050505]" />}>
      <SignUpContent />
    </Suspense>
  );
}

function SignUpContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user to Firestore
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });

        await saveUserToFirestore({
          uid: userCredential.user.uid,
          name: name,
          email: email,
          createdAt: new Date().toISOString()
        });
      }

      const isAdmin = userCredential.user?.email === "wazeert13@gmail.com";

      if (isAdmin) {
        localStorage.setItem("admin_token", "mudwash_session_active");
        router.push(returnTo || "/admin");
      } else {
        router.push(returnTo || "/");
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please sign in.");
      } else {
        setError("Failed to create account. Please try again.");
      }
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
              Create an <br /> Account<span className="text-brand-orange">.</span>
            </h1>
            <p className="text-white/40 text-sm mt-3">Unlock exclusive booking privileges and ultra-premium automotive detailing offers.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <form className="space-y-5" onSubmit={handleSignUp}>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-lg font-bold"
                >
                  {error}
                </motion.div>
              )}
              
              {/* Name Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none text-white/20 group-focus-within:text-brand-orange transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-extrabold uppercase tracking-widest text-xs py-5 rounded-none hover:bg-brand-orange transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : "Create Account"}
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
