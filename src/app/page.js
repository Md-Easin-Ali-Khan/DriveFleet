import FeaturedCars from "@/components/FeaturedCars";
import HeroBanner from "@/components/HeroBanner";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <HeroBanner></HeroBanner>
      <FeaturedCars></FeaturedCars>
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
    </main>
  )
}
