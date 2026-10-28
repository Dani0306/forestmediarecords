import Agenda from "@/components/Agenda";
import Tiraderas from "@/components/Tiraderas";
import DemoForm from "@/components/DemoForm";
import FollowUs from "@/components/FollowUs";
import ForgeProcess from "@/components/ForgeProcess";
import Hero from "@/components/Hero";
import KickSection from "@/components/KickSection";
import Releases from "@/components/Releases";
import Roster from "@/components/Roster";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import Studio from "@/components/Studio";
import Streamers from "@/components/Streamers";
import TopSongs from "@/components/TopSongs";
import Trending from "@/components/Trending";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <Releases />
        <Agenda />
        <Tiraderas />
        <Trending />
        <Roster />
        <TopSongs />
        <Streamers />
        <KickSection />
        <ForgeProcess />
        <Studio />
        <DemoForm />
        <FollowUs />
      </main>
      <SiteFooter />
    </>
  );
}
