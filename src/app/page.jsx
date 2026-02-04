import Featured from "../components/Featured";
import AboutSection from "../components/AboutSection";
import Banner from "../components/Banner";
import CommissionProcess from "../components/CommissionProcess";

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Home - Professional Digital Art Portfolio",
  description: "Welcome to Raf's digital art portfolio. Explore stunning artworks, commission custom pieces, and discover unique anime-style illustrations and character designs.",
  keywords: ["digital art portfolio", "anime art", "character design", "custom commissions", "digital illustrations", "art gallery"],
  openGraph: {
    title: "Rafs Artworks - Professional Digital Art Portfolio",
    description: "Welcome to Raf's digital art portfolio. Explore stunning artworks, commission custom pieces, and discover unique anime-style illustrations.",
    images: ['/og-home.jpg'],
  },
  twitter: {
    title: "Rafs Artworks - Professional Digital Art Portfolio",
    description: "Welcome to Raf's digital art portfolio. Explore stunning artworks and commission custom pieces.",
  },
}


export default function Home() {
  return (
   <div>
    <Banner></Banner>
    <Featured></Featured>
    <CommissionProcess></CommissionProcess>
    <AboutSection></AboutSection>
   </div>
  );
}
