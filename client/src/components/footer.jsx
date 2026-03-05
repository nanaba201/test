import React from "react";
import "../styles/components/footer.css";

const Footer = () => {
  return (
    <div>
      <nav className="footer">
        <div
          style={{ marginLeft: "20px", marginTop: "5px", textAlign: "start" }}
        >
          <p className="eden-school">EDEN INTERNATIONAL SCHOOL</p>
          <p>
            Address: <br />
            Kota Road , Bhilwara <br />
            Mobile Number - 01482-430134 , 9799298780
          </p>
        </div>
        <div style={{ marginTop: "5px", textAlign: "start" }}>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>QUICK LINKS</p>
          <p>
            <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
              HOME
            </a>{" "}
            <br />
            <a
              href="/about/mission-&-vision"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              ABOUT
            </a>{" "}
            <br />
            <a
              href="/academics/subject-combination"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              ACADEMICS
            </a>{" "}
            <br />
            <a
              href="/cbse-corner/cbse-mandatory-disclosure"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              CBSE CORNER
            </a>{" "}
            <br />
            <a
              href="/contact-us"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              CONTACT US
            </a>{" "}
            <br />
          </p>
        </div>
        <div
          style={{ marginRight: "80px", marginTop: "5px", textAlign: "start" }}
        >
          <p style={{ fontWeight: "bold", fontSize: "20px" }}> GET IN TOUCH</p>
          <p>
            EDEN INTERNATIONAL SCHOOL
            <br />
            Kota Road , Bhilwara
            <br />
            9799298780 <br />
            eden@gmail.com
          </p>
        </div>
      </nav>
      <div>
        Copyright © 2025 EDEN INTERNATIONAL SCHOOL. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
