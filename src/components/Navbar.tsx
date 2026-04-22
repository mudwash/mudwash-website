'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Settings, Calendar, User, CalendarDays, Wrench } from 'lucide-react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';

const Navbar = () => {
  const topNavRef = useRef<HTMLElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Simulated authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(topNavRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });
    });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      ctx.revert();
      unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={22} /> },
    { name: 'Services', href: '/services', icon: <Settings size={22} /> },
    { name: 'Parts', href: '/spare-parts', icon: <Wrench size={22} /> },
    { name: 'Bookings', href: '/bookings', icon: <Calendar size={22} /> },
    { name: 'Profile', href: isLoggedIn ? '/profile' : '/sign-up', icon: <User size={22} /> },
  ];

  return (
    <>
      {/* TOP HEADER */}
      <nav
        ref={topNavRef}
        className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#0A0A0A]/40 backdrop-blur-3xl border-b border-white/10 rounded-b-3xl"
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-xl md:text-2xl font-black tracking-tighter flex items-baseline">
            <span className="text-brand-orange italic">MUD</span>
            <span className="text-white italic">WASH</span>
            <div className="w-1.5 h-1.5 bg-brand-orange ml-1 rounded-full animate-pulse" />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.filter(l => l.name !== 'Profile').map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold text-light-grey hover:text-brand-orange transition-colors uppercase tracking-[0.2em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-orange transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href={isLoggedIn ? "/profile" : "/sign-up"} 
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all group"
          >
            <User size={18} className="text-white group-hover:text-brand-orange transition-colors" />
          </Link>
          <Link href="/bookings" className="flex items-center gap-2 bg-brand-orange text-black px-5 py-2 md:px-6 md:py-2.5 rounded-full font-bold uppercase tracking-tighter text-[10px] md:text-xs">
            <CalendarDays size={16} />
            <span className="hidden md:block">Book Mobile</span>
            <span className="md:hidden">Book</span>
          </Link>
        </div>
      </nav>

      {/* PREMIUM TOP-CURVED BOTTOM BAR */}
      <div 
        ref={bottomNavRef}
        className="lg:hidden fixed bottom-0 left-0 w-full z-[1000] transition-all duration-300"
      >
        <div className="bg-[#111111]/60 backdrop-blur-3xl border-t border-white/10 flex justify-around items-center pt-3 pb-6 px-4 shadow-[0_-15px_40px_rgba(0,0,0,0.6)] rounded-t-[3rem] relative">
          {/* Inner Light Beam/Glow for Premium Look */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center gap-1.5 transition-all w-16 ${isActive ? 'text-brand-orange scale-110' : 'text-white/50'}`}
              >
                <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-brand-orange/10 shadow-[0_0_20px_rgba(246,150,33,0.2)]' : ''}`}>
                  {link.icon}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider transition-all ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                  {link.name}
                </span>
                
                {/* Active Underline Pill (Like the screenshot model) */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 w-8 h-1 bg-brand-orange rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
