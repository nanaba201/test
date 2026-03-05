// // import React from "react";
// // import "../styles/components/navbar.css";
// // import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
// // import Pdf from "../assets/Admission Form.pdf";

// // const Navbar = () => {
// //   function onResumeClick() {
// //     window.open(Pdf);
// //   }
// //   return (
// //     <nav className="navbar">
// //       <div
// //         style={{
// //           flexDirection: "row",
// //           display: "flex",
// //           marginLeft: 20,
// //           alignItems: "center",
// //           justifyContent: "center",
// //           gap: "15px",
// //           marginTop: 10,
// //         }}
// //       >
// //         <a
// //           href="https://facebook.com"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <FaFacebook size={24} color="white" />
// //         </a>
// //         <a
// //           href="https://instagram.com"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <FaInstagram size={24} color="white" />
// //         </a>
// //         <a
// //           href="https://linkedin.com"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <FaLinkedin size={24} color="white" />
// //         </a>
// //       </div>
// //       <h4 style={{ fontWeight: 300 }}>CBSE Affiliation No. 1730176</h4>
// //       <button
// //         style={{
// //           marginRight: 30,
// //           backgroundColor: "orange",
// //           borderRadius: 5,
// //           height: "35px",
// //           display: "flex",
// //           alignItems: "center",
// //         }}
// //         onClick={onResumeClick}
// //       >
// //         Admission Open 2025-26
// //       </button>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React, { useState } from "react";
// import "../styles/components/navbar.css";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import Pdf from "../assets/Admission Form.pdf";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   function onResumeClick() {
//     window.open(Pdf);
//   }

//   return (
//     <nav className="navbar">
//       {/* Hamburger Menu for Mobile */}
//       <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
//         {menuOpen ? (
//           <FaTimes size={28} color="white" />
//         ) : (
//           <FaBars size={28} color="white" />
//         )}
//       </div>

//       {/* Social Links - Hidden in mobile and shown in dropdown */}
//       <div className={`nav-links ${menuOpen ? "open" : ""}`}>
//         <a
//           href="https://facebook.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaFacebook size={24} color="white" />
//         </a>
//         <a
//           href="https://instagram.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaInstagram size={24} color="white" />
//         </a>
//         <a
//           href="https://linkedin.com"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaLinkedin size={24} color="white" />
//         </a>
//       </div>

//       <h4 className="affiliation">CBSE Affiliation No. 1730176</h4>

//       {/* Admission Button */}
//       <button className="admission-button" onClick={onResumeClick}>
//         Admission Open 2025-26
//       </button>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import "../styles/components/navbar.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Pdf from "../assets/Admission Form.pdf";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  function onResumeClick() {
    window.open(Pdf);
  }

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Hamburger Menu for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <FaTimes size={28} color="white" />
        ) : (
          <FaBars size={28} color="white" />
        )}
      </div>

      {/* Social Links - Hidden in mobile and shown in dropdown */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={24} color="white" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={24} color="white" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} color="white" />
        </a>
      </div>

      <h4 className="affiliation">CBSE Affiliation No. 1730176</h4>

      {/* Admission Button */}
      <button className="admission-button" onClick={() =>navigate("/admissionForm") }>
        Admission Open 2025-26
      </button>
    </nav>
  );
};

export default Navbar;
