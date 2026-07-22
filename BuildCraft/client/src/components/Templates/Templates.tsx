import "./Templates.css";

import businessImg from "../../assets/templates/business.jpeg";
import ecommerceImg from "../../assets/templates/ecommerce.jpeg";
import educationImg from "../../assets/templates/education.jpeg";
import healthcareImg from "../../assets/templates/healthcare.jpeg";
import portfolioImg from "../../assets/templates/portfolio.jpeg";
import restaurantImg from "../../assets/templates/restaurant.jpeg";
import saasImg from "../../assets/templates/saas.jpeg";
import travelImg from "../../assets/templates/travel.jpeg";

interface Template {
  image: string;
  title: string;
  description: string;
}

const templates: Template[] = [
  {
    image: businessImg,
    title: "Business",
    description:
      "Professional websites for startups, agencies, and companies.",
  },
  {
    image: ecommerceImg,
    title: "E-Commerce",
    description:
      "Sell products online with secure payments and easy management.",
  },
  {
    image: restaurantImg,
    title: "Restaurant",
    description:
      "Online menus, reservations, and food ordering solutions.",
  },
  {
    image: educationImg,
    title: "Education",
    description:
      "Modern websites for schools, colleges, and online learning.",
  },
  {
    image: healthcareImg,
    title: "Healthcare",
    description:
      "Appointment booking and patient-friendly medical websites.",
  },
  {
    image: portfolioImg,
    title: "Portfolio",
    description:
      "Showcase your skills, projects, and achievements beautifully.",
  },
  {
    image: saasImg,
    title: "SaaS",
    description:
      "Modern SaaS platforms with dashboards and subscriptions.",
  },
  {
    image: travelImg,
    title: "Travel",
    description:
      "Travel booking, tour packages, and destination websites.",
  },
];

const Templates = (): React.ReactElement => {
  const scrollToPlan = (): void => {
    document.getElementById("plan")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="templates" className="templates-section">
      <div className="container">
        <div className="section-title">
          <h2>Website Templates</h2>

          <p>
            Explore professionally crafted website layouts designed for every
            industry.
          </p>
        </div>

        <div className="row g-4">
          {templates.map((template) => (
            <div className="col-lg-3 col-md-6" key={template.title}>
              <div className="template-card">
                <img
                  src={template.image}
                  alt={template.title}
                  className="template-image"
                />

                <h4>{template.title}</h4>

                <p>{template.description}</p>

                <button
                  type="button"
                  className="template-btn"
                  onClick={scrollToPlan}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="custom-template">
          <h3>Can't find your industry?</h3>

          <p>
            We build completely custom websites tailored to your business.
          </p>

          <button
            type="button"
            className="custom-btn"
            onClick={scrollToPlan}
          >
            Request Custom Website
          </button>
        </div>
      </div>
    </section>
  );
};

export default Templates;