// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import axios from "axios";
// import { toast } from "react-toastify";

// function FeeDetails() {
//   const [selectedStudent, setSelectedStudent] = useState("");
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [feeStatus, setFeeStatus] = useState({});
//   const [studentId, setStudentId] = useState(null);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   useEffect(() => {
//     if (selectedStudent) {
//       fetchFeeStatus(selectedStudent);
//     }
//   }, [selectedYear]);

//   const fetchFeeStatus = async (studentName) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/search_student_fee",
//         {
//           userName: studentName,
//         }
//       );

//       if (response.data.success && Array.isArray(response.data.fees)) {
//         const feeData = response.data.fees.reduce((acc, fee) => {
//           if (fee.year === selectedYear) {
//             acc[months[fee.month - 1]] = fee.status;
//           }
//           return acc;
//         }, {});

//         setFeeStatus(feeData);
//       } else {
//         toast.error("No student found with the provided username.");
//         console.error("Unexpected API response:", response.data);
//       }
//     } catch (error) {
//       toast.error("Error fetching fee status: ${error.message}");
//       console.error("Error fetching fee status:", error);
//     }
//   };

//   const years = Array.from(
//     { length: new Date().getFullYear() - 1999 },
//     (_, i) => 2000 + i
//   );

//   const changeFeeStatus = async (monthIndex) => {
//     if (!studentId) {
//       toast.error("Please search for a student first.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/change_fee_status",
//         {
//           studentId: studentId,
//           month: monthIndex,
//           year: selectedYear,
//           status: "done",
//         }
//       );

//       if (response.data.success) {
//         toast.success("Fee status updated successfully!");
//         fetchFeeStatus(selectedStudent);
//       } else {
//         toast.error("Failed to update fee status.");
//       }
//     } catch (error) {
//       toast.error(`Error updating fee status: ${error.message}`);
//       console.error("Error updating fee status:", error);
//     }
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <Sidebar />
//       <div
//         style={{
//           backgroundColor: "white",
//           color: "grey",
//           overflow: "auto",
//           padding: "20px",
//           width: "83vw",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "20px",
//           }}
//         >
//           <h2 style={{ color: "black" }}>Fee Details</h2>
//         </div>

//         {/* Search Box and Year Selector */}
//         <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//           <input
//             type="text"
//             placeholder="Enter Student UserName"
//             value={selectedStudent}
//             onChange={(e) => setSelectedStudent(e.target.value)}
//             style={{
//               padding: "8px",
//               borderRadius: "5px",
//               border: "1px solid grey",
//               width: "200px",
//             }}
//           />
//           <button
//             onClick={() => fetchFeeStatus(selectedStudent)}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: "green",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Search
//           </button>

//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(Number(e.target.value))}
//             style={{
//               padding: "8px",
//               borderRadius: "5px",
//               border: "1px solid grey",
//             }}
//           >
//             {years.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Fee Status Table */}
//         <table
//           style={{
//             width: "80vw",
//             borderCollapse: "collapse",
//             border: "1px solid grey",
//             marginTop: "20px",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#f0f0f0" }}>
//               <th style={{ padding: "10px", border: "1px solid grey" }}>
//                 Month
//               </th>
//               <th style={{ padding: "10px", border: "1px solid grey" }}>
//                 Fee Status
//               </th>
//               <th style={{ padding: "10px", border: "1px solid grey" }}>
//                 Deposited
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {months.map((month) => (
//               <tr key={month}>
//                 <td style={{ padding: "10px", border: "1px solid grey" }}>
//                   {month}
//                 </td>
//                 <td style={{ padding: "10px", border: "1px solid grey" }}>
//                   {feeStatus[month] || "Pending"}
//                 </td>
//                 <td style={{ padding: "10px", border: "1px solid grey" }}>
//                   <button
//                     style={{ color: "white", backgroundColor: "green" }}
//                     onClick={() => changeFeeStatus(index + 1)}
//                   >
//                     Deposited
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default FeeDetails;

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import {API_URL} from "../../services/api_service.jsx";

function FeeDetails() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [feeStatus, setFeeStatus] = useState({});
  const [studentId, setStudentId] = useState(null);
  const [fees, setFees] = useState([]);

  const months = [
    "Admission Form",
    "Registration Fee",
    "1st Term Fee",
    "2nd Term Fee",
    "3rd Term Fee",
    "Examination Fee",
    "Other Fee",
  ];

  useEffect(() => {
    if (selectedStudent) {
      fetchFeeStatus(selectedStudent);
    }
  }, [selectedYear]);

  const fetchFeeStatus = async (studentName) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/search_student_fee",
        { userName: studentName }
      );

      if (response.data.success && Array.isArray(response.data.fees)) {
        setFees(response.data.fees);
        setStudentId(response.data.fees[0]?.studentId || null);
      } else {
        toast.error("No student found with the provided username.");
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      toast.error(`Error fetching fee status: ${error.message}`);
      console.error("Error fetching fee status:", error);
    }
  };

  // const changeFeeStatus = async (monthIndex) => {
  //   if (!studentId) {
  //     toast.error("Please search for a student first.");
  //     return;
  //   }

  //   const feeEntry = fees.find(
  //     (fee) => fee.month === monthIndex && fee.year === selectedYear
  //   );
  //   if (!feeEntry) {
  //     toast.error("No fee record found for this month.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/change_fee_status",
  //       {
  //         studentId: feeEntry.studentId,
  //         month: feeEntry.month,
  //         year: feeEntry.year,
  //         status: "done",
  //       }
  //     );

  //     if (response.data.success) {
  //       toast.success("Fee status updated successfully!");
  //       fetchFeeStatus(selectedStudent);
  //     } else {
  //       toast.error("Failed to update fee status.");
  //     }
  //   } catch (error) {
  //     toast.error(`Error updating fee status: ${error.message}`);
  //     console.error("Error updating fee status:", error);
  //   }
  // };

  const changeFeeStatus = async (monthIndex) => {
    try {
      const response = await axios.post(
        `${API_URL}/change_fee_status`,
        {
          studentId: studentId,
          month: monthIndex + 1,
          year: selectedYear,
          status: "done",
        }
      );

      if (response.data.success) {
        toast.success("Fee status updated successfully!");
        setTimeout(() => fetchFeeStatus(selectedStudent), 500);
      } else {
        toast.error("Failed to update fee status.");
      }
    } catch (error) {
      toast.error(`Error updating fee status: ${error.message}`);
      console.error("Error updating fee status:", error);
    }
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => 2000 + i
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div
        style={{
          backgroundColor: "white",
          color: "grey",
          overflow: "auto",
          padding: "20px",
          width: "83vw",
        }}
      >
        <h2 style={{ color: "black" }}>Fee Details</h2>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter Student UserName"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid grey",
              width: "200px",
            }}
          />
          <button
            onClick={() => fetchFeeStatus(selectedStudent)}
            style={{
              padding: "8px 16px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid grey",
            }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <table
          style={{
            width: "80vw",
            borderCollapse: "collapse",
            border: "1px solid grey",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                Month
              </th>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                Fee Status
              </th>
              <th style={{ padding: "10px", border: "1px solid grey" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {months.map((month, index) => (
              <tr key={month}>
                <td style={{ padding: "10px", border: "1px solid grey" }}>
                  {month}
                </td>
                <td style={{ padding: "10px", border: "1px solid grey" }}>
                  {fees.find(
                    (fee) =>
                      fee.month === index + 1 && fee.year === selectedYear
                  )?.status || "Pending"}
                </td>
                <td style={{ padding: "10px", border: "1px solid grey" }}>
                  <button
                    onClick={() => changeFeeStatus(index)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Outlet />
      </div>
    </div>
  );
}

export default FeeDetails;
