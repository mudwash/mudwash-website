"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  Shield, 
  Mail,
  Camera
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-white/40 text-sm font-medium">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {[
            { name: "General Profile", icon: User, active: true },
            { name: "Security", icon: Lock, active: false },
            { name: "Notifications", icon: Bell, active: false },
            { name: "Regional & Language", icon: Globe, active: false },
            { name: "Billing & Plans", icon: CreditCard, active: false },
            { name: "Privacy", icon: Shield, active: false },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                item.active 
                  ? "bg-brand-orange text-black font-bold" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 space-y-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-white/5">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-brand-orange/20 flex items-center justify-center border-2 border-brand-orange/30 group-hover:border-brand-orange transition-colors">
                  <User size={40} className="text-brand-orange" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-brand-orange text-black rounded-full shadow-xl hover:scale-110 transition-transform">
                  <Camera size={14} />
                </button>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl font-bold mb-1">Wazeer</h3>
                <p className="text-white/40 text-sm mb-4">wazeert13@gmail.com</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded-full border border-brand-orange/20">Full Access</span>
                  <span className="px-3 py-1 bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">ID: AD-1313</span>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Wazeer"
                    className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue=""
                    className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-orange transition-colors" size={16} />
                  <input 
                    type="email" 
                    defaultValue="wazeert13@gmail.com"
                    className="w-full bg-[#050505] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Bio / Role Description</label>
                <textarea 
                  rows={4}
                  defaultValue="Head of operations and platform management. Responsible for overseeing detailing quality and customer satisfaction."
                  className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all resize-none"
                />
              </div>

              <div className="flex justify-end pt-4 gap-4">
                <button type="button" className="px-6 py-3 text-white/40 text-sm font-bold hover:text-white transition-colors">Discard Changes</button>
                <button type="submit" className="px-8 py-3 bg-brand-orange text-black rounded-xl font-bold text-sm hover:bg-white transition-colors">Save Changes</button>
              </div>
            </form>
          </motion.div>

          {/* Delete Account Danger Zone */}
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-red-500 mb-1">Deactivate Account</h4>
              <p className="text-white/40 text-xs">Temporarily disable your admin access. You can reactivate it later.</p>
            </div>
            <button className="px-6 py-3 border border-red-500/20 text-red-500 text-sm font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all">Deactivate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
