import Aboutus from "../../GeneralLayout/Aboutus";
import PageFooter from "../../GeneralLayout/Footer";
import Hero from "../../GeneralLayout/Hero";
import Service from "../../GeneralLayout/Service";

function PatronHomePage() {
  return (
    <div className="bg-gradient-to-r from-[#0F123F] to-[#1E2A5F] space-y-16 sm:space-y-24 overflow-hidden">
      <Hero />
      <Service />
      <Aboutus />
      <PageFooter />
    </div>
  );
}

export default PatronHomePage;
