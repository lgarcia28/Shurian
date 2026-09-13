import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Catalog } from "@/components/Catalog";
import { StoreInfo } from "@/components/StoreInfo";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { RepairWizardModal } from "@/components/RepairWizardModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-orange-500/20 selection:text-orange-600">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* Dynamic Catalog Section */}
        <Catalog />

        {/* Physical Store, Hours & Map Section */}
        <StoreInfo />
      </main>

      {/* Global Interactive Overlays & Modals */}
      <CartDrawer />
      <ProductModal />
      <RepairWizardModal />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
