import "./Hero.css";
import heroImage from "../../assets/images/hero-website.jpeg";

const Hero = (): React.ReactElement => {
  const scrollToPlan = (): void => {
    document.getElementById("plan")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToPortfolio = (): void => {
    document.getElementById("portfolio")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <span className="hero-tag">
          🚀 Custom Websites for Modern Businesses
        </span>

        <h1>
          Build Stunning <span>Websites</span>
          <br />
          Crafted Just for Your Business
        </h1>

        <p>
          We create modern, responsive and high-performing websites that help
          startups, entrepreneurs and businesses establish a strong online
          presence and attract more customers.
        </p>

        <div className="hero-buttons">
          <button
            type="button"
            className="primary-btn"
            onClick={scrollToPlan}
          >
            Plan My Website
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={scrollToPortfolio}
          >
            View Portfolio
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <h3>100+</h3>
            <p>Projects Planned</p>
          </div>

          <div>
            <h3>24/7</h3>
            <p>Support</p>
          </div>

          <div>
            <h3>100%</h3>
            <p>Customer Focused</p>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img src={heroImage} alt="BuildCraft Hero" />
      </div>
    </section>
  );
}

export default Hero;