import "./WhyChooseUs.css";
import {
  FaRocket,
  FaMobileAlt,
  FaLaptopCode,
  FaHeadset,
  FaShieldAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { ReactElement } from "react";

interface Feature {
  icon: ReactElement;
  title: string;
  description: string;
}

const WhyChooseUs = (): React.ReactElement => {
  const features: Feature[] = [
    {
      icon: <FaRocket />,
      title: "Fast Delivery",
      description:
        "Launch your business website quickly without compromising quality.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile First",
      description:
        "Every website is fully responsive and optimized for all devices.",
    },
    {
      icon: <FaLaptopCode />,
      title: "Custom Design",
      description:
        "Unique layouts designed specifically for your business goals.",
    },
    {
      icon: <FaHeadset />,
      title: "Friendly Support",
      description:
        "We're here to help before, during and after your website launch.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Reliable",
      description:
        "Built with security, speed and scalability in mind.",
    },
    {
      icon: <FaMoneyCheckAlt />,
      title: "Transparent Pricing",
      description:
        "Clear pricing with no hidden costs or unexpected surprises.",
    },
  ];

  return (
    <section className="why-section">
      <div className="container">
        <div className="section-title">
          <span>WHY BUILDCRAFT</span>

          <h2>Why Choose BuildCraft?</h2>

          <p>
            We don't just build websites. We build digital experiences that
            help businesses grow online.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-lg-4 col-md-6" key={feature.title}>
              <div className="feature-card">
                <div className="feature-icon">{feature.icon}</div>

                <h4>{feature.title}</h4>

                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;