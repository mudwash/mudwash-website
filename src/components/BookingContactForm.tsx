"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Car, Droplet, Calendar, Clock, Timer, Receipt, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { createBooking } from "@/lib/bookings";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

const summaryData = [
  {
    icon: <Car size={22} className="text-brand-orange" />,
    label: "Car Type",
    value: "Sedan",
  },
  {
    icon: <Droplet size={22} className="text-brand-orange" />,
    label: "Washing Plan",
    value: "Choose Your Plan",
  },
  {
    icon: <Calendar size={22} className="text-brand-orange" />,
    label: "Booking Date",
    value: "Choose Date",
  },
  {
    icon: <Clock size={22} className="text-brand-orange" />,
    label: "Booking Time",
    value: "Choose Time",
  },
  {
    icon: <Timer size={22} className="text-brand-orange" />,
    label: "Duration",
    value: "0 min",
  },
  {
    icon: <Receipt size={22} className="text-brand-orange" />,
    label: "Total Price",
    value: "AED 0",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BookingContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    terms: false
  });
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) return;

    // Check auth on submit only
    const { auth } = await import("@/lib/firebase");
    if (!auth.currentUser) {
      router.push("/sign-in?returnTo=/");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await createBooking({
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: "Full Detailing", // Static for now, should be passed from state
        date: "2024-04-22", // Static for now
        time: "10:00 AM", // Static for now
        location: "Mobile Detailing",
        amount: "AED 450",
        status: "Pending"
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="relative w-full min-h-[60vh] py-24 flex flex-col items-center justify-center bg-[#0A0A0A]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
          <p className="text-white/40 max-w-md mx-auto">Thank you for choosing MUDWASH. Our team will contact you shortly to confirm your premium detailing session.</p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="text-brand-orange font-bold uppercase tracking-widest text-xs hover:underline"
          >
            Back to Home
          </button>
        </motion.div>
      </section>
    );
  }
  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center bg-[#0A0A0A]">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Finalize Your Booking
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto font-medium">
            (No Service in RTA paid parking & unauthorized building parking)
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Side: Clean Summary Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {summaryData.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex items-start gap-4 hover:border-white/10 transition-colors"
              >
                <div className="mt-1">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {item.label}
                  </span>
                  <span className={`text-sm font-semibold tracking-wide ${item.value.includes('Choose') ? 'text-brand-orange' : 'text-white'}`}>
                    {item.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side: Clean Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 bg-[#111111] border border-white/5 rounded-2xl p-8 sm:p-10"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Contact Details
              </h3>
              <p className="text-white/40 text-sm">
                Enter your information below to secure your premium detailing session.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                required
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#0A0A0A] text-white px-5 py-4 rounded-xl border border-white/5 focus:border-brand-orange focus:bg-[#0F0F0F] placeholder:text-white/20 text-sm transition-all outline-none"
              />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  required
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full sm:w-1/2 bg-[#0A0A0A] text-white px-5 py-4 rounded-xl border border-white/5 focus:border-brand-orange focus:bg-[#0F0F0F] placeholder:text-white/20 text-sm transition-all outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full sm:w-1/2 bg-[#0A0A0A] text-white px-5 py-4 rounded-xl border border-white/5 focus:border-brand-orange focus:bg-[#0F0F0F] placeholder:text-white/20 text-sm transition-all outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 pb-6">
                <input
                  required
                  type="checkbox"
                  id="terms"
                  checked={formData.terms}
                  onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                  className="w-4 h-4 rounded border-white/10 bg-[#0A0A0A] text-brand-orange accent-brand-orange cursor-pointer"
                />
                <label htmlFor="terms" className="text-white/50 text-xs sm:text-sm cursor-pointer hover:text-white transition-colors">
                  I agree to the <span className="text-white underline decoration-white/20 underline-offset-2">Terms</span> & <span className="text-white underline decoration-white/20 underline-offset-2">Privacy Policy</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.terms}
                className="w-full bg-brand-orange text-black px-6 py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Confirm Booking"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
