'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Home, Heart, Plus, User, Bell, ShoppingBag, Calendar, MessageSquare, CalendarDays, Wrench, Download, Smartphone } from 'lucide-react';
import gsap from 'gsap';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import Dock from './Dock';

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  isCenter?: boolean;
}

export default function Navbar() {
  const topNavRef = useRef<HTMLElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // PWA Install State
  const [isInstallable, setIsInstallable] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      (window as any).deferredPrompt = e;
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if ((window as any).deferredPrompt) {
      setIsInstallable(true);
    }

    const handleAppInstalled = () => {
      setIsInstallable(false);
      (window as any).deferredPrompt = null;
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    const ctx = gsap.context(() => {
      if (topNavRef.current) {
        gsap.from(topNavRef.current, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
        });
      }
    });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      ctx.revert();
      unsubscribe();
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    console.log('[Navbar] Triggering PWA install prompt');
    window.dispatchEvent(new CustomEvent('trigger-pwa-install'));
  };

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/', icon: <Home size={22} /> },
    { name: 'Shop', href: '/spare-parts', icon: <ShoppingBag size={22} /> },
    { name: 'Book', href: '/bookings', icon: <Plus size={26} />, isCenter: true },
    { name: 'Notifications', href: '#', icon: <Bell size={22} /> },
    { name: 'Profile', href: isLoggedIn ? '/profile' : '/sign-up', icon: <User size={22} /> },
  ];

  return (
    <>
      {/* TOP HEADER (Desktop Floating Pill) */}
      <div className="hidden md:flex fixed top-6 left-0 w-full z-50 justify-center px-6">
        <nav
          ref={topNavRef}
          className="w-full max-w-6xl h-20 bg-[#0A0A0A]/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex items-center justify-between px-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500"
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-xl md:text-2xl font-black tracking-tighter flex items-baseline">
              <span className="text-brand-orange italic">MUD</span>
              <span className="text-white italic">WASH</span>
              <div className="w-1.5 h-1.5 bg-brand-orange ml-1 rounded-full group-hover:scale-150 transition-transform" />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.filter(l => l.name !== 'Profile' && !l.isCenter).map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap relative group transition-colors ${isActive ? 'text-brand-orange' : 'text-white/40 hover:text-white'}`}
                >
                  {link.name}

                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-brand-orange rounded-full shadow-[0_0_10px_#f69621]"
                    />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-white/20 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Group */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* PWA Install Button (Persistent in Top Bar) */}
            <button
              onClick={handleInstallClick}
              className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-3 rounded-2xl border border-white/10 bg-white/5 hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all group"
              title="Install App"
            >
              <Smartphone size={18} className="text-white group-hover:text-brand-orange transition-colors" />
              <span className="hidden md:block ml-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">App</span>
            </button>

            <Link
              href={isLoggedIn ? "/profile" : "/sign-up"}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 bg-white/5 hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all group"
            >
              <User size={18} className="text-white group-hover:text-brand-orange transition-colors" />
            </Link>

            <Link
              href="/bookings"
              className="group relative flex items-center gap-3 bg-brand-orange text-black px-5 py-3 md:px-8 md:py-3.5 rounded-2xl font-black uppercase italic text-xs tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(246,150,33,0.2)]"
            >
              <CalendarDays size={18} className="shrink-0" />
              <span className="hidden md:block relative z-10">Secure Booking</span>
              <span className="md:hidden">Book</span>
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </Link>
          </div>
        </nav>
      </div>

      {/* FLOATING DOCK (Mobile) */}
      <div
        ref={bottomNavRef}
        className="lg:hidden fixed bottom-8 left-0 right-0 z-[1000] flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <Dock
            panelHeight={64}
            baseItemSize={48}
            magnification={60}
            items={navLinks.map((link) => ({
              icon: link.icon,
              label: link.name,
              onClick: () => {
                if (link.name === 'Home' && pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  router.push(link.href);
                }
              },
              isActive: pathname === link.href,
              className: link.isCenter ? 'mx-2' : ''
            }))}
          />
        </div>
      </div>
      {/* INSTALL GUIDE MODAL */}
      <AnimatePresence>
        {showInstallModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInstallModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setShowInstallModal(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <Plus size={20} className="rotate-45" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-orange">
                  <Smartphone size={32} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Install MUDWASH App</h3>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">Get the premium experience on your home screen</p>
              </div>

              <div className="space-y-6">
                {/* iOS Instructions */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                      <Download size={16} />
                    </div>
                    <span className="text-white font-black uppercase italic text-xs tracking-widest">iOS (Safari)</span>
                  </div>
                  <p className="text-white/40 text-[11px] leading-relaxed">
                    1. Tap the <span className="text-white">"Share"</span> button at the bottom of Safari.<br />
                    2. Scroll down and select <span className="text-white">"Add to Home Screen"</span>.<br />
                    3. Tap <span className="text-white">"Add"</span> to confirm.
                  </p>
                </div>

                {/* Android / Other Instructions */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                      <Plus size={16} />
                    </div>
                    <span className="text-white font-black uppercase italic text-xs tracking-widest">Android (Chrome)</span>
                  </div>
                  <p className="text-white/40 text-[11px] leading-relaxed">
                    1. Tap the <span className="text-white">three dots</span> menu (⋮) in Chrome.<br />
                    2. Select <span className="text-white">"Install App"</span> or "Add to Home Screen".
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowInstallModal(false)}
                className="w-full mt-8 bg-white text-black py-4 rounded-xl font-black uppercase italic text-xs tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

