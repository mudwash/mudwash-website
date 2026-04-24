'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ShoppingBag, Calendar, User, MessageSquare, CalendarDays, Wrench } from 'lucide-react';
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
    { name: 'Home', href: '/', icon: <Home size={24} /> },
    { name: 'Shop', href: '/spare-parts', icon: <ShoppingBag size={24} /> },
    { name: 'Bookings', href: '/bookings', icon: <Calendar size={24} /> },
    { name: 'Message', href: '#', icon: <MessageSquare size={24} /> },
    { name: 'Profile', href: isLoggedIn ? '/profile' : '/sign-up', icon: <User size={24} /> },
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

      {/* PREMIUM BOTTOM BAR */}
      <div 
        ref={bottomNavRef}
        className="lg:hidden fixed bottom-0 left-0 w-full z-[1000]"
      >
        <div className="bg-[#1C1C1E] border-t border-white/5 flex justify-around items-center pt-3 pb-8 px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center gap-1 transition-all flex-1 ${isActive ? 'text-brand-orange' : 'text-[#8E8E93]'}`}
              >
                <div className="p-1 rounded-xl transition-all duration-300">
                  {link.icon}
                </div>
                <span className="text-[10px] font-medium tracking-tight">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
