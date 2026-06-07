import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import WorkGallery from "@/components/WorkGallery";
import Process from "@/components/Process";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  return (
    <>
      <Reveal />
      <AnnouncementBar />
      <div className="dark-top">
        <Navbar />
        <Hero />
      </div>
      <WhatWeDo />
      <WorkGallery />
      <Process />
      <Clients />
      <Footer />
      <ProjectModal />
    </>
  );
}
