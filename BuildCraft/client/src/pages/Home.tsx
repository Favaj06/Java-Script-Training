import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Templates from "../components/Templates/Templates";
import Pricing from "../components/Pricing/Pricing";
import Portfolio from "../components/Portfolio/Portfolio";
import Reviews from "../components/Reviews/Reviews";
import PlanWebsite from "../components/PlanWebsite/PlanWebsite";
import DiscoveryCall from "../components/DiscoveryCall/DiscoveryCall";
import Footer from "../components/Footer/Footer";

const Home = (): React.ReactElement => {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Templates />
      <Pricing />
      <Portfolio />
      <Reviews />
      <PlanWebsite />
      <DiscoveryCall />
      <Footer />
    </>
  );
}

export default Home;