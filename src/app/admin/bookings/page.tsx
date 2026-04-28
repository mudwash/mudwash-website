"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Clock,
  Loader2
} from "lucide-react";
import { getBookings, updateBookingStatus, Booking } from "@/lib/bookings";

const statusStyles = {
  Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    fetchBookings();
    return () => { isMountedRef.current = false; };
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      if (isMountedRef.current) setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: Booking["status"]) => {
    try {
      await updateBookingStatus(id, status);
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bookings</h1>
          <p className="text-white/40 text-sm font-medium">Manage and monitor all detailing appointments.</p>
        </div>
        <button className="bg-brand-orange text-black px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors">
          <Plus size={18} />
          <span>New Booking</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-orange transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by customer, service..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-3 bg-[#0A0A0A] border border-white/5 rounded-xl text-white/60 hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
            <Filter size={18} />
            <span className="text-sm font-medium">Filters</span>
          </button>
          <button className="px-4 py-3 bg-[#0A0A0A] border border-white/5 rounded-xl text-white/60 hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
            <Download size={18} />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-orange" size={32} />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20 text-white/20">
            <p>No bookings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/30 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
                  <th className="px-6 py-4">Booking</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service Details</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs text-brand-orange font-bold uppercase">{booking.id?.slice(-6)}</span>
                        <div className="flex items-center gap-2 text-white/40 text-[10px]">
                          <Calendar size={12} />
                          <span>{booking.date}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <Clock size={12} />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-white mb-1">{booking.customerName}</span>
                        <div className="flex items-center gap-3 text-white/40 text-[10px]">
                          <span className="flex items-center gap-1"><Mail size={10} /> {booking.email}</span>
                          <span className="flex items-center gap-1"><Phone size={10} /> {booking.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-white/80">
                        {booking.service}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-white/50">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin size={12} className="text-brand-orange" />
                        {booking.location}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <select 
                        value={booking.status}
                        onChange={(e) => booking.id && handleStatusUpdate(booking.id, e.target.value as any)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border bg-transparent focus:outline-none cursor-pointer ${statusStyles[booking.status]}`}
                      >
                        <option value="Pending" className="bg-[#0A0A0A] text-amber-500">Pending</option>
                        <option value="Completed" className="bg-[#0A0A0A] text-emerald-500">Completed</option>
                        <option value="Cancelled" className="bg-[#0A0A0A] text-red-500">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-6 font-bold">{booking.amount}</td>
                    <td className="px-6 py-6 text-right">
                      <button className="p-2 hover:bg-white/5 rounded-lg text-white/30 hover:text-white transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
