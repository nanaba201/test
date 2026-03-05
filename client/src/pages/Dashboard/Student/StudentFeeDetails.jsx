import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

function FeeDetails() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
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

  // Function to get cookie value
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  };
  // Get username from cookies
  useEffect(() => {
    const storedUsername = getCookie("username");
    if (storedUsername) {
      setSelectedStudent(storedUsername);
      fetchFeeStatus(storedUsername);
    }
  }, []);

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
