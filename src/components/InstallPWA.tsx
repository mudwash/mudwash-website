"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    const checkPrompt = () => {
      if ((window as any).deferredPrompt) {
        setDeferredPrompt((window as any).deferredPrompt);
        setIsInstallable(true);
      }
    };

    checkPrompt();
    const interval = setInterval(checkPrompt, 500);
    setTimeout(() => clearInterval(interval), 5000);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      (window as any).deferredPrompt = e;
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      (window as any).deferredPrompt = null;
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      clearInterval(interval);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
      (window as any).deferredPrompt = null;
    } else {
      // If no native prompt is available (e.g. iOS Safari), show instructions
      setShowModal(true);
    }
  };

  if (isInstalled) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 bg-white/10 text-white hover:bg-white hover:text-black px-3 py-2 md:px-4 md:py-2.5 rounded-full font-bold uppercase tracking-widest text-[9px] md:text-[10px] transition-all whitespace-nowrap"
      >
        <Download size={14} />
        <span>Install App</span>
      </button>

      {/* iOS / Manual Install Instructions Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 max-w-sm w-full text-center space-y-6">
            <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto text-brand-orange">
              <Download size={32} />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Install MUDWASH</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                To install this app on your device:
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 text-left space-y-3 border border-white/5">
              <p className="text-sm text-white/80 flex gap-3"><strong className="text-brand-orange">1.</strong> Tap the <strong>Share</strong> icon in your browser menu.</p>
              <p className="text-sm text-white/80 flex gap-3"><strong className="text-brand-orange">2.</strong> Scroll down and tap <strong>"Add to Home Screen"</strong>.</p>
              <p className="text-sm text-white/80 flex gap-3"><strong className="text-brand-orange">3.</strong> Tap <strong>Add</strong> in the top right corner.</p>
            </div>

            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-brand-orange text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-white transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
