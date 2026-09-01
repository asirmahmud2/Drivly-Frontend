import FeaturedCars from "@/Components/Home/FeaturedCars";
import FinalCTA from "@/Components/Home/FinalCTA";
import Hero from "@/Components/Home/Hero";
import HowItWorks from "@/Components/Home/HowItWorks";
import PremiumExperience from "@/Components/Home/PremiumExperience";
import Testimonials from "@/Components/Home/Testimonials";
import WhyDrivly from "@/Components/Home/WhyUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCars />
      <WhyDrivly />
      <HowItWorks />
      <PremiumExperience />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
