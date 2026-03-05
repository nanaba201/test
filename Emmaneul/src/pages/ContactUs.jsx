// import React from "react";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const showToast = () => {
//   toast.success("Form Submitted successfully!");
// };

// const [formData, setFormData] = useState({
//   source: "", // How did you come to know about EIS
//   studentName: "",
//   dob: "",
//   address: "",
//   currentClass: "",
//   currentSchool: "",
//   fatherName: "",
//   fatherContact: "",
//   fatherQualification: "",
//   fatherOccupation: "",
//   motherName: "",
//   motherContact: "",
//   motherQualification: "",
//   motherOccupation: "",
//   siblings: "",
//   whatsappNumber: "",
//   schoolTransport: "",
//   remarks: "",
// });

// const handleChange = (e) => {
//   setFormData({ ...formData, [e.target.name]: e.target.value });
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await fetch("http://localhost:5000/form/submit", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         type: "enquiry",
//         data: formData,
//       }),
//     });

//     const result = await response.json();
//     if (result.success) {
//       alert("Form submitted successfully!");
//     } else {
//       alert("Failed to submit form. Please try again.");
//     }
//   } catch (error) {
//     alert("Error submitting form. Check console for details.");
//     console.error("Submission error:", error);
//   }
// };
// function ContactUs() {
//   return (
//     <div>
//       <img
//         src="../src/assets/school_slider.jpg"
//         alt="Slide 1"
//         className="zoom-img"
//       />
//       <div style={{ backgroundColor: "white", color: "black", padding: 20 }}>
//         <img
//           src="../src/assets/Eden School logo bhilwara.jpg"
//           style={{ height: 120, width: 120, marginTop: "-50px" }}
//           alt="Slide 1"
//           className="zoom-img"
//         />
//         <p style={{ fontSize: "20px" }}>EDEN INTERNATIONAL SCHOOL</p>
//         <h3 style={{ fontSize: "25px" }}>CONTACT US</h3>

//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//             marginRight: "100px",
//             marginLeft: "80px",
//             borderRadius: 12,
//             padding: 20,
//             color: "white",
//             gap: "80px",
//           }}
//         >
//   <div
//     style={{
//       color: "white",
//       fontSize: "24px",
//       borderRadius: "12px",
//       fontWeight: "bold",
//       margin: "20px",
//       backgroundColor: "rgba(25, 135, 84, 0.7)",
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
//       padding: "20px",
//       width: "80%",
//       maxWidth: "800px",
//     }}
//   >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <img
//                 src="../../src/assets/eden-logo.png"
//                 style={{ maxWidth: "100px", marginTop: "15px" }}
//                 alt="School Logo"
//               />
//               <div>ENQUIRY FORM</div>
//             </div>
//             <form onSubmit={handleSubmit}>
//               {Object.keys(formData).map((key) => (
//                 <input
//                   key={key}
//                   type="text"
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   required
//                   style={{
//                     backgroundColor: "white",
//                     color: "black",
//                     width: "100%",
//                     height: "5vh",
//                     borderRadius: "10px",
//                     border: "1px solid #ccc",
//                     padding: "0 10px",
//                     outline: "none",
//                     marginBottom: "10px",
//                   }}
//                   placeholder={key.replace(/([A-Z])/g, " $1").trim()}
//                 />
//               ))}
//               <button
//                 type="submit"
//                 style={{
//                   backgroundColor: "orange",
//                   borderRadius: "5px",
//                   height: "40px",
//                   minWidth: "100px",
//                   marginTop: "20px",
//                   padding: "5px 15px",
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                   color: "white",
//                   border: "none",
//                   cursor: "pointer",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   transition: "background-color 0.3s ease",
//                   display: "block",
//                   margin: "0 auto",
//                 }}
//                 onMouseOver={(e) =>
//                   (e.target.style.backgroundColor = "darkorange")
//                 }
//                 onMouseOut={(e) => (e.target.style.backgroundColor = "orange")}
//               >
//                 SUBMIT
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContactUs;

import React, { useState } from "react";
import { toast } from "react-toastify";

const showToast = () => {
  toast.success("Form Submitted successfully!");
};

function ContactUs() {
  const [formData, setFormData] = useState({
    source: "",
    studentName: "",
    dob: "",
    address: "",
    currentClass: "",
    currentSchool: "",
    fatherName: "",
    fatherContact: "",
    fatherQualification: "",
    fatherOccupation: "",
    motherName: "",
    motherContact: "",
    motherQualification: "",
    motherOccupation: "",
    siblings: "",
    whatsappNumber: "",
    schoolTransport: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "enquiry",
          data: formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        showToast();
        window.location.reload();
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form. Check console for details.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div>
      <img
        src="../src/assets/school_slider.jpg"
        alt="Slide 1"
        className="zoom-img"
      />
      <div style={{ backgroundColor: "white", color: "black", padding: 20 }}>
        <img
          src="../src/assets/Eden School logo bhilwara.jpg"
          style={{ height: 120, width: 120, marginTop: "-50px" }}
          alt="School Logo"
          className="zoom-img"
        />
        <p style={{ fontSize: "20px" }}>EDEN INTERNATIONAL SCHOOL</p>
        <h3 style={{ fontSize: "25px" }}>CONTACT US</h3>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "100px",
            marginLeft: "80px",
            borderRadius: 12,
            padding: 20,
            color: "white",
            gap: "80px",
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
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="../assets/eden-logo.png"
                style={{ maxWidth: "100px", marginTop: "15px" }}
                alt="School Logo"
              />
              <div>ENQUIRY FORM</div>
            </div>
            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "100%",
                    height: "5vh",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    padding: "0 10px",
                    outline: "none",
                    marginBottom: "10px",
                  }}
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                />
              ))}
              <button
                type="submit"
                style={{
                  backgroundColor: "orange",
                  borderRadius: "5px",
                  height: "40px",
                  minWidth: "100px",
                  marginTop: "20px",
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
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "darkorange")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "orange")}
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
