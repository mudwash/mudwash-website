"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  Truck, 
  RefreshCcw,
  Loader2,
  CheckCircle2,
  CreditCard,
  X,
  Shield,
  Apple,
  ArrowRight,
  Smartphone
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getParts, Part } from "@/lib/parts";
import { auth } from "@/lib/firebase";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const parts = await getParts();
        const foundPart = parts.find(p => p.id === id);
        if (foundPart) {
          setPart(foundPart);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPart();
  }, [id]);

  const handleBookNow = () => {
    const user = auth.currentUser;
    if (!user) {
      router.push(`/sign-in?returnTo=/checkout/${id}`);
    } else {
      router.push(`/checkout/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="text-brand-orange animate-spin" size={40} />
      </div>
    );
  }

  if (!part) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-8">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase italic">Product Not Found</h2>
        <button 
          onClick={() => router.push("/spare-parts")}
          className="text-brand-orange hover:underline font-bold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 lg:py-40">
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 md:mb-12 group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Back to Parts</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
          
          {/* Left: Premium Image Gallery Layout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
              <img 
                src={part.image} 
                alt={part.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute -z-10 -bottom-5 md:-bottom-10 -right-5 md:-right-10 w-[200px] md:[300px] h-[200px] md:[300px] bg-brand-orange/10 blur-[60px] md:blur-[100px] rounded-full" />
          </motion.div>

          {/* Right: Product Details */}
          <div className="space-y-6 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 bg-brand-orange/10 text-brand-orange text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full border border-brand-orange/20">
                  {part.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] md:text-xs font-bold">{part.rating}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-tight md:leading-none mb-4 md:mb-6">
                {part.name}
              </h1>
              
              <div className="flex items-baseline gap-3 md:gap-4">
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-orange tracking-tighter">{part.price}</span>
                {part.originalPrice && part.originalPrice !== "AED 0" && (
                  <span className="text-white/20 text-xs md:text-sm lg:text-base line-through decoration-brand-orange/40 italic">
                    {part.originalPrice}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              <p className="text-white/60 leading-relaxed text-xs md:text-base font-medium">
                {part.description || "Experience the pinnacle of automotive engineering with this high-performance component. Designed specifically for luxury and performance vehicles, ensuring seamless integration and superior longevity."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-center gap-3 p-3 md:p-4 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl">
                  <ShieldCheck className="text-brand-orange" size={24} />
                  <div>
                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/40">Warranty</p>
                    <p className="text-[10px] md:text-xs font-bold">12 Months Full Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 md:p-4 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl">
                  <Truck className="text-brand-orange" size={24} />
                  <div>
                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/40">Delivery</p>
                    <p className="text-[10px] md:text-xs font-bold">24-48 Hour Shipping</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 md:pt-10 flex flex-col gap-4 md:gap-5"
            >
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full">
                <button 
                  onClick={handleBookNow}
                  className="flex-[3] bg-white text-black min-h-[72px] rounded-lg font-black uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-brand-orange transition-all duration-500 flex items-center justify-center gap-3 px-10 shadow-2xl shadow-white/5"
                >
                  Buy Now
                </button>
                <button className="flex-1 min-h-[72px] sm:w-20 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/5 transition-all group">
                  <ShoppingCart size={22} className="text-white/40 group-hover:text-white transition-colors" />
                </button>
              </div>
            </motion.div>

            {/* Extra Features */}
            <div className="pt-8 md:pt-10 border-t border-white/5 flex flex-wrap gap-4 md:gap-8">
              <div className="flex items-center gap-2 text-white/40">
                <RefreshCcw size={16} />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">7 Days Return</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <CheckCircle2 size={16} />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">100% Genuine</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
