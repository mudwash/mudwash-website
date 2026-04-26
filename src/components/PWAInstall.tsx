"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const PWAInstall = () => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIos, setIsIos] = useState(false);

    useEffect(() => {
        if (!isHomePage) {
            setShowPrompt(false);
            return;
        }

        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        }

        const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIos(isIosDevice);

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(
                (registration) => console.log('[PWA] SW registered'),
                (error) => console.log('[PWA] SW registration failed', error)
            );
        }

        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            if (isHomePage) {
                setTimeout(() => setShowPrompt(true), 5000);
            }
        };

        const triggerHandler = () => {
            setShowPrompt(true);
        };

        const onCaptured = () => {
            if ((window as any).deferredPrompt) {
                setDeferredPrompt((window as any).deferredPrompt);
                if (isHomePage) {
                    setTimeout(() => setShowPrompt(true), 5000);
                }
            }
        };

        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('trigger-pwa-install', triggerHandler);
        window.addEventListener('beforeinstallprompt-captured', onCaptured);

        if ((window as any).deferredPrompt) {
            onCaptured();
        }

        if (isIosDevice && isHomePage) {
            setTimeout(() => setShowPrompt(true), 5000);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('trigger-pwa-install', triggerHandler);
            window.removeEventListener('beforeinstallprompt-captured', onCaptured);
        };
    }, [isHomePage]);

    const handleInstall = async () => {
        if (isIos) return;

        const promptToUse = deferredPrompt || (window as any).deferredPrompt;
        if (!promptToUse) return;

        promptToUse.prompt();
        const { outcome } = await promptToUse.userChoice;

        if (outcome === 'accepted') {
            setShowPrompt(false);
            (window as any).deferredPrompt = null;
        }
        setDeferredPrompt(null);
    };

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.95 }}
                    className="fixed bottom-28 left-4 right-4 md:left-auto md:right-12 md:w-80 z-[110] p-5 bg-[#0A0A0A]/95 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                >
                    <button
                        onClick={() => setShowPrompt(false)}
                        className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f69621]/20 to-[#f69621]/5 flex items-center justify-center border border-[#f69621]/20 overflow-hidden shadow-inner shrink-0 p-2.5">
                            <Image
                                src="/icon-192x192.png"
                                alt="MUDWASH Logo"
                                width={45}
                                height={45}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1 pt-0.5">
                            <div className="flex items-center gap-1.5 mb-1">
                                <h3 className="text-white text-sm font-black uppercase italic tracking-[0.15em]">MUDWASH Official</h3>
                                <Sparkles size={12} className="text-[#f69621] animate-pulse" />
                            </div>
                            <p className="text-white/70 text-[11px] leading-relaxed mt-1.5 font-medium">
                                {isIos
                                    ? "Install MUDWASH for the fastest premium detailing bookings. Tap 'Share' then 'Add to Home Screen'."
                                    : "Get the MUDWASH App for exclusive sessions and a seamless premium experience."}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                        <button
                            onClick={handleInstall}
                            className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-[0.2em] transition-all 
                ${isIos
                                    ? 'bg-white/10 text-white/50 border border-white/10'
                                    : 'bg-[#f69621] text-black hover:scale-[1.02] active:scale-95 shadow-lg'}`}
                        >
                            {isIos ? "iOS Instructions" : "Install Now"}
                        </button>
                        {isIos && (
                            <button
                                onClick={() => setShowPrompt(false)}
                                className="px-4 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-[0.2em] bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                            >
                                Got it
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PWAInstall;
