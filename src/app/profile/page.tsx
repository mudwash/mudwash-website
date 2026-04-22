"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ShieldCheck, 
  Clock,
  Loader2,
  Edit3,
  CheckCircle2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/lib/firebase";
import { getUserProfile, UserProfile } from "@/lib/users";
import { signOut } from "firebase/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/sign-in?returnTo=/profile");
      } else {
        const data = await getUserProfile(user.uid);
        if (data) {
          setProfile(data);
        } else {
          // If no profile in Firestore, create a basic one from auth
          setProfile({
            uid: user.uid,
            name: user.displayName || "Member",
            email: user.email || "",
            createdAt: new Date().toISOString()
          });
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("admin_token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="text-brand-orange animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-8">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 space-y-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-orange to-brand-orange/20 flex items-center justify-center text-black border-4 border-[#0A0A0A] shadow-2xl relative group">
                  <span className="text-4xl font-black">{profile?.name.charAt(0)}</span>
                  <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-brand-orange transition-colors" />
                </div>
                <div>
                  <h1 className="text-xl font-black uppercase tracking-tight">{profile?.name}</h1>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Mudwash Member</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'overview', icon: User, label: 'Account Overview' },
                  { id: 'orders', icon: Package, label: 'My Orders' },
                  { id: 'settings', icon: Settings, label: 'Settings' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === tab.id 
                      ? 'bg-white text-black' 
                      : 'text-white/40 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Stats Card */}
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-12">
                        <div className="p-3 bg-brand-orange/10 rounded-2xl text-brand-orange">
                          <ShieldCheck size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">Active</span>
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Member Since</p>
                        <p className="text-2xl font-black uppercase tracking-tighter">
                          {new Date(profile?.createdAt || "").toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Quick Action Card */}
                    <div className="bg-brand-orange rounded-[2rem] p-8 flex flex-col justify-between text-black">
                      <div className="flex justify-between items-start mb-12">
                        <div className="p-3 bg-black/10 rounded-2xl">
                          <Clock size={24} />
                        </div>
                      </div>
                      <div>
                        <p className="text-black/40 text-[10px] font-black uppercase tracking-widest mb-1">Total Bookings</p>
                        <div className="flex items-end justify-between">
                          <p className="text-5xl font-black tracking-tighter">04</p>
                          <button 
                            onClick={() => setActiveTab('orders')}
                            className="bg-black text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                          >
                            View All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 md:p-10">
                    <div className="flex justify-between items-center mb-10">
                      <h2 className="text-2xl font-black uppercase tracking-tight">Personal Information</h2>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-orange hover:text-white transition-colors">
                        <Edit3 size={14} /> Edit Profile
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Full Name</p>
                        <div className="flex items-center gap-3 text-white/80">
                          <User size={16} className="text-brand-orange" />
                          <p className="font-bold">{profile?.name}</p>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Email Address</p>
                        <div className="flex items-center gap-3 text-white/80">
                          <Mail size={16} className="text-brand-orange" />
                          <p className="font-bold">{profile?.email}</p>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Phone Number</p>
                        <div className="flex items-center gap-3 text-white/80">
                          <Phone size={16} className="text-brand-orange" />
                          <p className="font-bold">{profile?.phone || "Not Provided"}</p>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Default Address</p>
                        <div className="flex items-center gap-3 text-white/80">
                          <MapPin size={16} className="text-brand-orange" />
                          <p className="font-bold">{profile?.address ? `${profile.address}, ${profile.city}` : "Not Provided"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 md:p-10"
                >
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Recent Orders</h2>
                  <div className="space-y-4">
                    {/* Placeholder for real orders */}
                    <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                      <Package size={40} className="mx-auto text-white/10 mb-4" />
                      <p className="text-white/20 font-bold uppercase tracking-widest text-[10px]">Your order history is empty</p>
                      <button 
                        onClick={() => router.push('/spare-parts')}
                        className="mt-6 text-brand-orange hover:underline text-xs font-black uppercase tracking-widest"
                      >
                        Browse Parts
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 md:p-10"
                >
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                      <div>
                        <p className="font-bold uppercase tracking-tight text-sm mb-1">Email Notifications</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest">Receive updates about your orders</p>
                      </div>
                      <div className="w-12 h-6 bg-brand-orange rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-black rounded-full absolute right-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                      <div>
                        <p className="font-bold uppercase tracking-tight text-sm mb-1">Privacy Mode</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest">Hide profile details from public searches</p>
                      </div>
                      <div className="w-12 h-6 bg-white/10 rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white/40 rounded-full absolute left-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
