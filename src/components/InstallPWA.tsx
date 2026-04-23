"use client";

import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

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
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
    (window as any).deferredPrompt = null;
  };

  if (!isInstallable || isInstalled) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 bg-white/10 text-white hover:bg-white hover:text-black px-3 py-2 md:px-4 md:py-2.5 rounded-full font-bold uppercase tracking-widest text-[9px] md:text-[10px] transition-all whitespace-nowrap"
    >
      <Download size={14} />
      <span>Install App</span>
    </button>
  );
}
