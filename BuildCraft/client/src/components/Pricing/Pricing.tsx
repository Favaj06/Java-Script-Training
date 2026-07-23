import "./Pricing.css";
import { FaCheckCircle } from "react-icons/fa";

interface Plan {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  button: string;
  popular: boolean;
}

const plans: Plan[] = [
  {
    title: "Starter",
    price: "₹9,999",
    subtitle: "Perfect for individuals & startups",
    features: [
      "5 Responsive Pages",
      "Mobile Friendly Design",
      "Basic SEO Setup",
      "Contact Form",
      "1 Month Support",
    ],
    button: "Get Started",
    popular: false,
  },
  {
    title: "Professional",
    price: "₹24,999",
    subtitle: "Best for growing businesses",
    features: [
      "10 Responsive Pages",
      "Advanced UI/UX",
      "SEO Optimized",
      "WhatsApp Integration",
      "Admin Dashboard",
      "3 Months Support",
    ],
    button: "Choose Plan",
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    subtitle: "For large businesses & organizations",
    features: [
      "Unlimited Pages",
      "Custom Features",
      "API Integrations",
      "Advanced Security",
      "Priority Support",
      "Scalable Architecture",
    ],
    button: "Contact Us",
    popular: false,
  },
];

const Pricing = (): React.ReactElement => {
  const scrollToPlan = (): void => {
    document.getElementById("plan")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="pricing-title">
          <h2>Simple & Transparent Pricing</h2>

          <p>
            Choose the perfect website package for your business.
          </p>
        </div>

        <div className="row g-4">
          {plans.map((plan) => (
            <div className="col-lg-4" key={plan.title}>
              <div className={`pricing-card ${plan.popular ? "popular" : ""}`}>
                {plan.popular && (
                  <div className="popular-badge">
                    Most Popular
                  </div>
                )}

                <h3>{plan.title}</h3>

                <h1>{plan.price}</h1>

                <p>{plan.subtitle}</p>

                <ul>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <FaCheckCircle className="check" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="pricing-btn"
                  onClick={scrollToPlan}
                >
                  {plan.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;