"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  Wrench,
  User,
  Package,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Services", href: "/admin/services", icon: Wrench },
  { name: "Parts", href: "/admin/parts", icon: Package },
  { name: "Garages", href: "/admin/garages", icon: MapPin },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

import { AdminGuard } from "@/components/RoleGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("admin_token");
      router.push("/sign-in");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AdminGuard>
      <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-[#0A0A0A] border-r border-white/5 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-black text-xl">M</span>
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl tracking-tight"
              >
                MUDWASH
              </motion.span>
            )}
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-white/5 rounded-md transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-brand-orange text-black" 
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} className={isActive ? "text-black" : "group-hover:text-brand-orange"} />
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {link.name}
                  </motion.span>
                )}
                {isActive && isSidebarOpen && (
                  <motion.div
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-black"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-white/50 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        {/* Topbar */}
        <header className="h-20 bg-[#0A0A0A]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors hidden lg:block"
            >
              <Menu size={20} className="text-white/50" />
            </button>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-orange transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-[#111111] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-white/50 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full border-2 border-[#0A0A0A]" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Wazeer</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Platform Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-orange-600 flex items-center justify-center border-2 border-white/10">
                <User size={20} className="text-black" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
      </div>
    </AdminGuard>
  );
}
