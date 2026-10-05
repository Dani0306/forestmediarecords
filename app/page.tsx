import Agenda from "@/components/Agenda";
import DemoForm from "@/components/DemoForm";
import ForgeProcess from "@/components/ForgeProcess";
import Hero from "@/components/Hero";
import KickSection from "@/components/KickSection";
import Roster from "@/components/Roster";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <Agenda />
        <Roster />
        <KickSection />
        <ForgeProcess />
        <DemoForm />
      </main>
      <SiteFooter />
    </>
  );
}
