import AboutSection from "../components/AboutSection";
import Banner from "../components/Banner";
import CommissionProcess from "../components/CommissionProcess";
import Testimonials from "../components/Testimonials";


export default function Home() {
  return (
   <div>
    <Banner></Banner>
    <CommissionProcess></CommissionProcess>
    <AboutSection></AboutSection>
    <Testimonials></Testimonials>
   </div>
  );
}
