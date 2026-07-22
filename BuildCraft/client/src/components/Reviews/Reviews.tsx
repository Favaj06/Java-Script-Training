import "./Reviews.css";
import { FaStar } from "react-icons/fa";

interface Review {
  name: string;
  company: string;
  review: string;
}

const reviews: Review[] = [
  {
    name: "Arun Kumar",
    company: "TechNova Solutions",
    review:
      "BuildCraft delivered a modern website that exceeded our expectations. The process was smooth and highly professional.",
  },
  {
    name: "Priya Sharma",
    company: "Bloom Café",
    review:
      "Our restaurant website looks amazing and works perfectly on mobile. Customers love the online menu and booking feature.",
  },
  {
    name: "Rahul Verma",
    company: "RV Digital",
    review:
      "Excellent communication, clean UI, and timely delivery. I would definitely recommend BuildCraft to others.",
  },
];

const Reviews = (): React.ReactElement => {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="reviews-title">
          <h2>What Our Clients Say</h2>

          <p>
            We believe every successful website starts with understanding our
            clients' needs.
          </p>
        </div>

        <div className="row g-4">
          {reviews.map((review, index) => (
            <div className="col-lg-4" key={index}>
              <div className="review-card">
                <div className="avatar">
                  {review.name.charAt(0)}
                </div>

                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="review-text">
                  "{review.review}"
                </p>

                <h4>{review.name}</h4>

                <span>{review.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;