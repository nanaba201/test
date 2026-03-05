import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import logo from "../../assets/eden-logo.png"
import couchImg from "../../assets/couch.png"

function EdenCricketAcademy() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
    number: "",
  });

  const handleChange = (e) => {
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "24px",
            borderRadius: "12px",
            fontWeight: "bold",
            margin: "20px",
            backgroundColor: "rgba(25, 135, 84, 0.7)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            padding: "20px",
            width: "80%",
            maxWidth: "800px",
          }}
        >
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
              <div>CRICKET ACADEMY</div>
            </div>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter your name"
              />
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter your Age"
              />
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter your Class"
              />
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter your Contact Info."
              />
            </div>
          </div>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "darkorange")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "orange")}
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginRight: "100px",
          marginLeft: "80px",
          marginBottom: "70px",
          backgroundColor: "rgba(25, 135, 84, 0.7)",
          borderRadius: 12,
          padding: 20,
          color: "white",
          gap: "80px",
        }}
      >
        <img
          src={couchImg}
          style={{ height: 200, width: 200, marginLeft: 20 }}
          alt="School Logo"
          className="zoom-img"
        />

        <div>
          <h2
            style={{
              textAlign: "left",
              color: "white",
              marginLeft: 8,
              marginBottom: "10px",
            }}
          >
            Know Your Coach:
          </h2>

          <div
            style={{
              marginRight: "100px",
              left: 0,
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
              color: "black",
              gap: "80px",
              textAlign: "left",
            }}
          >
            <h2 style={{ marginTop: "-10px" }}>Abhimanyu Mathur</h2>
            <div style={{ fontSize: "18px" }}>
              Professional cricketer with a successful career representing the
              Rajasthan cricket team. Adept at handling high-pressure
              situations, working in teams, and demonstrating strong leadership
              skills. Seeking a challenging role to leverage my transferable
              skills, critical thinking abilities, and strong work ethic.
            </div>
          </div>

          <div
            style={{
              marginRight: "100px",
              left: 0,
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
              marginTop: "10px",
              color: "black",
              gap: "80px",
              textAlign: "left",
            }}
          >
            <h2 style={{ marginTop: "-10px" }}>Work Experience :-</h2>
            <ul
              style={{
                listStyleType: "disc",
                textAlign: "left",
                marginLeft: "10px",
                color: "black",
              }}
            >
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Rajasthan Cricket Team Period: <br />
                2015 to Present
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Represented U-16 Rajasthan for 2015-16 Vijay Merchant Trophy.
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Represented U-19 Rajasthan for 2017-18 Cooch Behar Trophy.
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Represented U-19 Rajasthan for 2018-19 Cooch Behar Trophy
                (Semi-Finalist)
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Represented U-19 Rajasthan for 2017-18 Vino Mankad Trophy.
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Represented U-19 Rajasthan for 2018-19 Vino Mankad Trophy
                (Semi-Finalist)
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Represented U-23 Rajasthan for 2018-19 Col. C.K. Nayadu Trophy.
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Attended U-19 National Cricket Academy Camp 2019 at Dharamshala
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Represented U-25 Rajasthan 2020-21 One Day tournament
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Represented U-25 Rajasthan 2020-21 Col. C.K. Nayudu Trophy
                (Semi-Finalist).
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Selected in probables for Team Rajasthan in Syed Mushtaq Ali
                Tournament, 2020-21.
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Selected in probables for Team Rajasthan in Vijay Hazare Trophy,
                2020-21
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                Played in RAJASTHAN PREMIER LEAGUE (RPL) 2022-23
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                2023-24 Ranji Probables
              </li>
            </ul>
          </div>
          <div
            style={{
              marginRight: "100px",
              left: 0,
              backgroundColor: "white",
              borderRadius: 12,
              padding: 20,
              color: "black",
              gap: "80px",
              textAlign: "left",
              marginTop: "10px",
            }}
          >
            <h2 style={{ marginTop: "-10px" }}>Get In Touch :-</h2>
            <p>
              <FaPhoneAlt className="footer-icon" /> +91 8875519824
            </p>
            <p>
              <FaEnvelope className="footer-icon" /> mathurabhimanyu08@gmail.com
            </p>
            <p>
              <FaMapMarkerAlt className="footer-icon" /> H-95, Bapunagar,
              Bhilwara, Rajasthan, 311001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  backgroundColor: "white",
  color: "black",
  width: "70%",
  height: "5vh",
  borderRadius: "10px",
  border: "1px solid #ccc",
  padding: "0 10px",
  outline: "none",
  marginBottom: "10px",
};

const buttonStyle = {
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
  display: "block",
  margin: "0 auto",
};

export default EdenCricketAcademy;
