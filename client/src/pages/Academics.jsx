import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import "../styles/pages/academics.css";

const Academics = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);

  const routesMap = {
    // "Subject Combination": "/subject",
    // "Fee Structure": "/fee",
    // "Examination Schedule": "exam",
  };

  const handleNavigationClick = (item) => {
    navigate(routesMap[item] || `/${item.toLowerCase().replace(/\s+/g, "-")}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
  };

  return (
    <div>
      {/*<Navbar />*/}
      {/* Image Slider Positioned Behind Top Section */}
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slide">
            <img
              src="./src/assets/academics.jpg"
              alt="Slide 1"
              className="zoom-img"
            />
          </div>
          <div className="slide">
            <img
              src="./src/assets/academics_1.jpg"
              alt="Slide 2"
              className="zoom-img"
            />
          </div>
          <div className="slide">
            <img
              src="./src/assets/academics_1.jpg"
              alt="Slide 3"
              className="zoom-img"
            />
          </div>
        </Slider>
      </div>

      {/* Top Section (Placed Over the Slider) */}
      <div className="home-container">
        <div className="top-section">
          <img
            src={"./src/assets/school.png"}
            className="school-logo"
            alt="School Logo"
          />
          <div className="nav-links">
            {[
              "Subject Combination",
              "Fee Structure",
              "Examination Schedule",
            ].map((item, index) => (
              <h2
                key={index}
                className="nav-item"
                onClick={() => handleNavigationClick(item)}
              >
                {item}
              </h2>
            ))}
          </div>
        </div>

        {/* Heading Section */}
        <div className="heading-section" ref={headingRef}>
          <h1 className="heading-text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi
            varius molestie etiam feugiat nam aenean. Sem curae maecenas et
            praesent sit torquent elit sodales...
          </h1>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Academics;
