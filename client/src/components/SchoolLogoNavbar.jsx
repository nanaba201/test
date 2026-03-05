import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/SchoolLogoNavbar.css";

import logo from "../assets/eden-logo.png"

function SchoolLogoNavbar() {
  const navigate = useNavigate();
  const [hoveredNavItem, setHoveredNavItem] = useState(null);

  const routesMap = {
    About: "/about",
    "CBSE Corner": "/cbse",
    Academics: "/academics",
    Gallery: "/gallery",
    Eca: "/Eca",
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

  return (
    <div className="navbar">
      <img
        src={logo}
        style={{
          maxWidth: 120,
          marginLeft: "10px",
          maxHeight: 50,
          cursor: "pointer",
        }}
        alt="School Logo"
        onClick={() => navigate("/")}
      />
      <div className="nav-links">
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

            {/* Dropdown Menu */}
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
  );
}

export default SchoolLogoNavbar;
