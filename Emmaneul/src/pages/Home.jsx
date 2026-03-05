import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Home.css";
import { toast } from "react-toastify";
import { fetchNews } from "../services/api_service";

import slider from "../assets/school_slider.jpg";
import slider1 from "../assets/school_slider_1.jpg";
import logo from "../assets/eden-logo.png"

const Home = ({ username }) => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const routesMap = {
    About: "/about",
    "CBSE Corner": "/cbse",
    Academics: "/academics",
    Gallery: "/gallery",
  };

  const dropdownItems = {
    About: [
      "Mission & Vision",
      "From the Principal Desk",
      "From the Chairman Desk",
    ],
    Academics: ["Subject Combination", "Fee Structure", "Examination Schedule"],
    ECA: ["Eden Cricket Academy"],
    "CBSE Corner": ["CBSE Mandatory Disclosure"],
    Gallery: ["Photos", "Videos", "Events"],
    Online: ["Login"],
    Infrastructure: [
      "Laboratories",
      "Libraries",
      "Arts Rooms",
      "Sports",
      "Assembly Area",
    ],
  };

  const handleNavigationClick = (parent, child) => {
    if (child) {
      navigate(
        `/${parent.toLowerCase().replace(/\s+/g, "-")}/${child
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      );
    } else {
      navigate(
        routesMap[parent] || `/${parent.toLowerCase().replace(/\s+/g, "-")}`
      );
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Slider settings
  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
  };
  const showToast = () => {
    toast.success("Form Submitted successfully!");
  };

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews(); // Fetch news using the API function
        setNews(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getNews();
  }, []);

  // Function to convert timestamp to a readable format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  };

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
    number: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      type: "cricket",
      data: formData,
    };

    try {
      const response = await fetch("http://localhost:5000/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Form Submitted successfully!");
        setFormData({ name: "", age: "", class: "", number: "" }); // Clear form
      } else {
        toast.error("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error, please try again");
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Slider Section (Limited to Top Section Only) */}
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slide">
            <img
              src={slider}
              alt="Slide 1"
              className="zoom-img"
            />
          </div>
          <div className="slide">
            <img
              src={slider1}
              alt="Slide 2"
              className="zoom-img"
            />
          </div>
          <div className="slide">
            <img
              src={slider}
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
            src={logo}
            className="school-logoo"
            alt="School Logo"
          />
          <div className="nav-links">
            {isMobile && (
              <div className="hamburger-icon" onClick={toggleMenu}>
                <div className={`bar ${isMenuOpen ? "open" : ""}`} />
                <div className={`bar ${isMenuOpen ? "open" : ""}`} />
                <div className={`bar ${isMenuOpen ? "open" : ""}`} />
              </div>
            )}
            <div
              className={`nav-menu ${
                isMobile ? (isMenuOpen ? "open" : "closed") : "open"
              }`}
            >
              {[
                "About",
                "Academics",
                "ECA",
                "CBSE Corner",
                "Gallery",
                "Online",
                "Infrastructure",
              ].map((item, index) => (
                <div
                  key={index}
                  className="nav-item-container"
                  onMouseEnter={() => setHoveredNavItem(item)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <h2 className="nav-item">{item}</h2>
                  {hoveredNavItem === item && dropdownItems[item] && (
                    <div className="dropdown-menu">
                      {dropdownItems[item].map((option, idx) => (
                        <p
                          key={idx}
                          onClick={() => handleNavigationClick(item, option)}
                        >
                          {option}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
          textAlign: "start",
          marginLeft: "10px",
          marginTop: "-300px",
        }}
      >
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
      </div> */}
      {/* School News Section */}
      <div className="responsive-container">
        <div className="heading-section" ref={headingRef}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
              gap: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={logo}
                style={{
                  maxWidth: "100px",
                  marginTop: "15px",
                }}
                alt="School Logo"
              />
              <div>Enquiry</div>
            </div>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Enter your name"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                className="input-field_1"
                placeholder="Enter your Age"
              />
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                required
                className="input-field_1"
                placeholder="Enter your Class"
              />
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required
                className="input-field_1"
                placeholder="Enter your Contact Info."
              />
            </div>
          </div>
          <button
            style={{
              backgroundColor: "orange",
              borderRadius: "5px",
              height: "40px",
              minWidth: "100px",
              padding: "5px 15px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              border: "none",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "darkorange")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "orange")}
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>

        <div className="school-news">
          <div style={{ fontSize: "30px", paddingBottom: "30px" }}>
            SCHOOL NEWS
          </div>
          <div
            style={{
              borderBottom: "1px dotted black",
              width: "95%",
              marginLeft: 5,
            }}
          ></div>

          {error ? (
            <p style={{ color: "red", padding: "10px 0" }}>{error}</p>
          ) : (
            news.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "10px 0",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#488A55",
                    color: "white",
                    borderRadius: 8,
                    width: 100,
                    height: 60,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {formatDate(item.date).split(" ")[0]} <br />
                  {formatDate(item.date).split(" ")[1]}
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "normal",
                    textAlign: "left",
                    margin: "0 0 0 25px",
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
