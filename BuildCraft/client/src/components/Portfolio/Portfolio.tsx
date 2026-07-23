import "./Portfolio.css";

import {
  FaExternalLinkAlt,
  FaReact,
  FaPython,
  FaDatabase,
} from "react-icons/fa";
import type { IconType } from "react-icons";

import businessImg from "../../assets/templates/business.jpeg";
import restaurantImg from "../../assets/templates/restaurant.jpeg";
import ecommerceImg from "../../assets/templates/ecommerce.jpeg";
import portfolioImg from "../../assets/templates/portfolio.jpeg";

interface Project {
  image: string;
  title: string;
  category: string;
  description: string;
  tech: IconType[];
}

const projects: Project[] = [
  {
    image: businessImg,
    title: "Business Website",
    category: "Corporate Website",
    description:
      "Modern responsive website designed for startups and businesses.",
    tech: [FaReact, FaPython, FaDatabase],
  },
  {
    image: restaurantImg,
    title: "Restaurant Website",
    category: "Food & Dining",
    description:
      "Restaurant website with online menu, reservations and contact form.",
    tech: [FaReact, FaPython, FaDatabase],
  },
  {
    image: ecommerceImg,
    title: "E-Commerce Store",
    category: "Online Shopping",
    description:
      "Complete online shopping platform with secure checkout system.",
    tech: [FaReact, FaPython, FaDatabase],
  },
  {
    image: portfolioImg,
    title: "Portfolio Website",
    category: "Personal Branding",
    description:
      "Creative portfolio website for freelancers and professionals.",
    tech: [FaReact, FaPython, FaDatabase],
  },
];

const Portfolio = (): React.ReactElement => {
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="portfolio-title">
          <h2>Our Recent Projects</h2>

          <p>
            Explore some of the websites we've designed and developed for
            different industries.
          </p>
        </div>

        <div className="row g-4">
          {projects.map((project) => (
            <div className="col-lg-6" key={project.title}>
              <div className="portfolio-card">
                <div className="portfolio-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="portfolio-preview"
                  />
                </div>

                <div className="portfolio-content">
                  <small>{project.category}</small>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="tech-icons">
                    {project.tech.map((Icon, i) => (
                      <span key={`${project.title}-${i}`}>
                        <Icon />
                      </span>
                    ))}
                  </div>

                  <button type="button" className="portfolio-btn">
                    View Project
                    <FaExternalLinkAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;