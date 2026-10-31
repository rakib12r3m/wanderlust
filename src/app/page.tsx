import { Banner } from "@/components/home/banner";
import { Cta } from "@/components/home/cta";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import Featured from "@/components/home/Featured";

// The featured API is a local dev server, so render at request time instead of
// baking the data into the build (the API isn't reachable during `next build`).
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      
      <Banner />
      <Featured/>
      <WhyChooseUs />
      <Testimonials />
      <Cta />
      
    </>
  );
}
