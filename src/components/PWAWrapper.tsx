"use client";

import dynamic from 'next/dynamic';

const PWAInstall = dynamic(() => import("./PWAInstall"), {
  ssr: false,
});

const AppSplash = dynamic(() => import("./AppSplash"), {
  ssr: false,
});

export default function PWAWrapper() {
  return (
    <>
      <AppSplash />
      <PWAInstall />
    </>
  );
}
