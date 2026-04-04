import Contact from "@/components/cards/contact";
import FeaturesCards from "@/components/cards/FeaturesCards";
import Feedbacks from "@/components/cards/feedbacks";
import ProductPreview from "@/components/cards/ProductPreview";
import FAQSection from "@/components/faq";
import Features from "@/components/features";
import Grids from "@/components/grids";
import Header from "@/components/header";
import { Hero } from "@/components/hero";
import MapSection from "@/components/mapSection";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <FeaturesCards />
      <ProductPreview />
      <Header
        badge="Products"
        title="Features that will make your life easier"
        subtitle="Streamline your hiring process with powerful tools for sourcing,
        evaluating, and onboarding top talent - all in one platform."
      />

      <Grids />
      <Header
        badge="Availability"
        title="We are available everywhere"
        subtitle="Our platform is available in all countries, will support from over 20,000+ representatives"
        className="mt-40 md:mt-40"
      />
      <MapSection />
      <Header
        badge="pricing"
        title="Pricing so simple, you'd buy instantly"
        subtitle="Pick from our plans and get started in minutes, simple for everyone."
        className="mt-3"
      />
      <Pricing />
      <Header
        badge="testimonials"
        title="Recruiters love us"
        subtitle="People have chosen us from all over the world to help them with their hiring process. Take a look at some of their feedbacks."
        className="my-10"
      />
      <Feedbacks />
      <FAQSection />
      <Contact />
    </div>
  );
}
