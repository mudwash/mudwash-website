"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      (window as any).deferredPrompt = e;
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      // Auto show modal after a short delay if not installed
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      (window as any).deferredPrompt = null;
      setShowModal(false);
    });

    // Check if prompt was already captured by layout script
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
      setIsInstallable(true);
      setTimeout(() => setShowModal(true), 2000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setShowModal(false);
    }
    setDeferredPrompt(null);
    (window as any).deferredPrompt = null;
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Desktop/Navbar Button */}
      {isInstallable && (
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-white/10 text-white hover:bg-white hover:text-black px-3 py-2 md:px-4 md:py-2.5 rounded-full font-bold uppercase tracking-widest text-[9px] md:text-[10px] transition-all whitespace-nowrap"
        >
          <Download size={14} />
          <span>Install App</span>
        </button>
      )}

      {/* PWA Install Modal (Pop Msg) */}
      {showModal && (
        <div className="fixed inset-0 z-[2000] flex items-end justify-center p-4 md:items-center bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-20 md:slide-in-from-bottom-8 duration-700 relative">
            
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative p-8 md:p-10 flex flex-col items-center">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all z-20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 h-24 bg-gradient-to-br from-brand-orange to-[#FF8C00] rounded-3xl flex items-center justify-center p-5 shadow-[0_20px_40px_rgba(246,150,33,0.3)] border border-white/20 mb-8 relative"
              >
                <img src="/icon-192x192.png" alt="App Icon" className="w-full h-full object-contain rounded-xl" />
                <div className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">PRO</div>
              </motion.div>
              
              <div className="text-center space-y-3 mb-10">
                <h3 className="text-3xl font-black text-white tracking-tighter leading-none">
                  EXPERIENCE <br /> <span className="text-brand-orange">MUDWASH PRO.</span>
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-[280px] mx-auto">
                  Install our official app for ultra-fast bookings, exclusive offers, and a premium seamless experience.
                </p>
              </div>

              <div className="flex flex-col w-full gap-4">
                {isInstallable ? (
                  <button
                    onClick={handleInstallClick}
                    className="w-full group relative overflow-hidden bg-white hover:bg-brand-orange text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-[11px] transition-all duration-500 shadow-[0_15px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_30px_rgba(255,102,0,0.3)] active:scale-[0.98]"
                  >
                    <span className="relative z-10">Install MUDWASH</span>
                  </button>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-orange text-center">iOS Installation Guide</p>
                    <div className="flex items-center justify-between text-white/60 text-[11px] font-medium">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                        </div>
                        <span>1. Tap Share</span>
                      </div>
                      <div className="w-8 h-[1px] bg-white/10" />
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                        <span>2. Add to Home</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full text-white/20 font-bold py-2 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                >
                  Continue in Browser
                </button>
              </div>
            </div>
            
            {/* Animated Progress/Border Bar */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-80" 
            />
          </div>
        </div>
      )}
    </>
  );
}
