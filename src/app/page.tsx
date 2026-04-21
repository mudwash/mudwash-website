import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import NearbyGarages from "@/components/NearbyGarages";
import Locations from "@/components/Locations";
import BookingCalendar from "@/components/BookingCalendar";
import PremiumDetailing from "@/components/PremiumDetailing";
import BookingContactForm from "@/components/BookingContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ServicesGrid />
      <Locations />
      {/* <NearbyGarages /> */}
      <BookingCalendar />
      <PremiumDetailing />
      <BookingContactForm />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
