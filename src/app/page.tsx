import { Banner } from "@/components/home/banner";
import { Cta } from "@/components/home/cta";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";

export default function Home() {
  return (
    <>
      
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
      
    </>
  );
}
