import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Systems from "@/components/Systems";
import GrowthCalculator from "@/components/GrowthCalculator";
import WorkGallery from "@/components/WorkGallery";
import Process from "@/components/Process";
import Studio from "@/components/Studio";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import GridGlow from "@/components/GridGlow";
import MobileCTABar from "@/components/MobileCTABar";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  return (
    <>
      <Reveal />
      <GridGlow />
      <a className="skip-link" href="#main">Skip to content</a>
      <AnnouncementBar />
      <div className="dark-top">
        <Navbar />
        <Hero />
      </div>
      <main id="main">
        <WhatWeDo />
        <Systems />
        <GrowthCalculator />
        <WorkGallery />
        <Process />
        <Studio />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <MobileCTABar />
      <ProjectModal />
    </>
  );
}
