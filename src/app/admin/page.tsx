"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock3,
  Loader2,
  Package
} from "lucide-react";
import { getBookings, Booking } from "@/lib/bookings";
import { getServices } from "@/lib/services";
import { getParts } from "@/lib/parts";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [serviceCount, setServiceCount] = useState(0);
  const [partsCount, setPartsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [bookingsData, servicesData, partsData] = await Promise.all([
          getBookings(),
          getServices(),
          getParts()
        ]);
        if (isMounted) {
          setBookings(bookingsData);
          setServiceCount(servicesData.length);
          setPartsCount(partsData.length);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const totalRevenue = bookings
    .filter(b => b.status === "Completed")
    .reduce((acc, b) => acc + parseInt(b.amount.replace(/\D/g, "") || "0"), 0);

  const stats = [
    { 
      label: "Total Bookings", 
      value: bookings.length.toString(), 
      change: "+12.5%", 
      trend: "up", 
      icon: Calendar,
      color: "bg-blue-500/10 text-blue-500"
    },
    { 
      label: "Live Services", 
      value: serviceCount.toString(), 
      change: "+2", 
      trend: "up", 
      icon: Users,
      color: "bg-purple-500/10 text-purple-500"
    },
    { 
      label: "Inventory Parts", 
      value: partsCount.toString(), 
      change: "+5", 
      trend: "up", 
      icon: Package,
      color: "bg-blue-500/10 text-blue-500"
    },
    { 
      label: "Total Revenue", 
      value: `AED ${totalRevenue.toLocaleString()}`, 
      change: "+18.7%", 
      trend: "up", 
      icon: TrendingUp,
      color: "bg-brand-orange/10 text-brand-orange"
    },
    { 
      label: "Pending Action", 
      value: bookings.filter(b => b.status === "Pending").length.toString(), 
      change: "-5.4%", 
      trend: "down", 
      icon: Clock,
      color: "bg-emerald-500/10 text-emerald-500"
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-brand-orange" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/40 text-sm font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 sm:p-6 hover:border-white/10 transition-colors group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${stat.color}`}>
                <stat.icon size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div className={`flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-xs font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                {stat.change}
                <ArrowUpRight size={12} className={stat.trend === "down" ? "rotate-90" : ""} />
              </div>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-white/40 text-[8px] sm:text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-sm sm:text-2xl font-black italic tracking-tighter uppercase">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Bookings</h3>
            <button className="text-brand-orange text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-mono text-brand-orange/60 uppercase text-xs">#{booking.id?.slice(-6)}</td>
                    <td className="px-6 py-4 font-black text-white italic uppercase tracking-tight">{booking.customerName}</td>
                    <td className="px-6 py-4 text-white/50 text-xs font-bold uppercase">{booking.service}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        booking.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        booking.status === "Pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        "bg-red-500/10 text-red-500 border-red-500/20"
                      }`}>
                        {booking.status === "Completed" ? <CheckCircle2 size={12} /> :
                         booking.status === "Pending" ? <Clock3 size={12} /> :
                         <XCircle size={12} />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-white italic tracking-tighter">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Table Replacement */}
          <div className="md:hidden divide-y divide-white/5">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[9px] font-black text-brand-orange uppercase tracking-widest mb-1">#{booking.id?.slice(-6)}</p>
                    <p className="font-black text-white italic uppercase tracking-tight leading-none">{booking.customerName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    booking.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    booking.status === "Pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                    "bg-red-500/10 text-red-500 border-red-500/20"
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <p className="text-white/40 uppercase">{booking.service}</p>
                  <p className="text-white italic">{booking.amount}</p>
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <div className="px-6 py-8 text-center text-white/20 text-xs font-bold uppercase tracking-widest">No recent bookings</div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions / Activity */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6">Real-time Activity</h3>
          <div className="flex-1 space-y-6">
            {bookings.slice(0, 4).map((b, i) => (
              <div key={b.id} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <Calendar size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{b.customerName} booked {b.service}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-tighter mt-1">{b.date} • {b.time}</p>
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <p className="text-center text-white/20 text-xs py-10">Waiting for first booking...</p>
            )}
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
            <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-sm transition-all">
              Refresh Data
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
