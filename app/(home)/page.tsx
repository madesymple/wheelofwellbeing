import Contact from "@/components/cards/contact";
import Feedbacks from "@/components/cards/feedbacks";
import FAQSection from "@/components/faq";
import { Hero } from "@/components/hero";
import Problem from "@/components/problem";
import HowItWorks from "@/components/how-it-works";
import SpokesGrid from "@/components/spokes-grid";
import About from "@/components/about";

export default function Home() {
  return (
    <div>
      <Hero />
      <Problem />
      <HowItWorks />
      <SpokesGrid />
      <Feedbacks />
      <div id="about">
        <About />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <Contact />
    </div>
  );
}
