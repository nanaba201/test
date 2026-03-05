import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "../styles/pages/gallery.css";

const Gallery = () => {
  return (
    <div>
      <div className="page_layout">
        <img
          src={"./src/assets/school.png"}
          className="school_logo"
          alt="School Logo"
        />
        <div className="school_name">EDEN INTERNATIONAL SCHOOL</div>
        <div className="cbse_disclosure">PHOTO GALLERY</div>
      </div>

      {/* New Section */}
      <div className="gallery">
        <img
          src={"./src/assets/school_slider_1.jpg"}
          className="school_logo_1"
          alt="School Logo"
        />
        <img
          src={"./src/assets/school_slider.jpg"}
          className="school_logo_1"
          alt="School Logo"
        />
        <img
          src={"./src/assets/academics.jpg"}
          className="school_logo_1"
          alt="School Logo"
        />
        <img
          src={"./src/assets/academics_1.jpg"}
          className="school_logo_1"
          alt="School Logo"
        />
      </div>
    </div>
  );
};

export default Gallery;
