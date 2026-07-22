import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = (): React.ReactElement => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company */}
          <div className="footer-col">
            <h2 className="footer-logo">
              Build<span>Craft</span>
            </h2>

            <p>
              We build modern, responsive and scalable websites for startups,
              businesses and enterprises.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>

            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#templates">Templates</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#portfolio">Portfolio</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>

            <ul>
              <li>Business Website</li>
              <li>E-Commerce</li>
              <li>Portfolio Website</li>
              <li>Website Maintenance</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>

            <p>Email</p>
            <small>contact@buildcraft.com</small>

            <p style={{ marginTop: "15px" }}>Phone</p>
            <small>+91 98765 43210</small>

            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>

              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <hr />

        <div className="copyright">
          © 2026 BuildCraft. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;