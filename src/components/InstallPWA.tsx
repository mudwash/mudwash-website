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
      {showModal && isInstallable && (
        <div className="fixed inset-0 z-[2000] flex items-end justify-center p-4 md:items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#111111] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
            <div className="relative p-6 md:p-8">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 bg-brand-orange/20 rounded-2xl flex items-center justify-center p-4 shadow-lg border border-brand-orange/30">
                  <img src="/icon-192x192.png" alt="App Icon" className="w-full h-full object-contain rounded-lg" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">Install MUDWASH</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Install our app for a faster, better experience. Access premium detailing services directly from your home screen.
                  </p>
                </div>

                <div className="flex flex-col w-full gap-3 mt-4">
                  <button
                    onClick={handleInstallClick}
                    className="w-full bg-brand-orange text-black font-black py-4 rounded-2xl uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_10px_20px_rgba(246,150,33,0.3)] active:scale-95"
                  >
                    Install Now
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full text-white/40 font-bold py-2 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bottom Glow */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-50" />
          </div>
        </div>
      )}
    </>
  );
}
