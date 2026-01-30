import Featured from "../components/Featured";
import AboutSection from "../components/AboutSection";
import Banner from "../components/Banner";
import CommissionProcess from "../components/CommissionProcess";

// Force dynamic rendering
export const dynamic = 'force-dynamic'


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
