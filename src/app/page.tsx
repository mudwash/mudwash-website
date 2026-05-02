import dynamic from "next/dynamic";

import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";

// Lazy load components below the fold
const BeforeAfterSlider = dynamic(() => import("@/components/BeforeAfterSlider"));
const NearbyGarages = dynamic(() => import("@/components/NearbyGarages"));
const Locations = dynamic(() => import("@/components/Locations"));
const BookingCalendar = dynamic(() => import("@/components/BookingCalendar"));
const PremiumDetailing = dynamic(() => import("@/components/PremiumDetailing"));
const BookingContactForm = dynamic(() => import("@/components/BookingContactForm"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">

      <Hero />
      <ServicesGrid />
      <BeforeAfterSlider />
      <Locations />
      <NearbyGarages />
      <BookingCalendar />
      <PremiumDetailing />
      <BookingContactForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
