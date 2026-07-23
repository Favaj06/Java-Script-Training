import "./Navbar.css";

const Navbar = (): React.ReactElement => {
  return (
    <nav className="navbar">
      <div className="logo">
        Build<span>Craft</span>
      </div>

      <ul className="nav-links">
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

        <li>
          <a href="#reviews">Reviews</a>
        </li>
      </ul>

      <button type="button" className="nav-btn">
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;