import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/design/Hero";
import Features from "@/components/design/Features";
import CTA from "@/components/design/CTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black max-w-7xl mx-auto">
      <Navbar />
      <main className="flex w-full flex-col items-center justify-center py-8 px-8 bg-white dark:bg-black sm:items-start">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
