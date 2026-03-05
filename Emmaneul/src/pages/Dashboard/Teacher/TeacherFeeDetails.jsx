import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";

function TeacherFeeDetails() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [feeStatus, setFeeStatus] = useState({});

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/fetch_users?role=student"
        );
        const result = await response.json();

        if (result.success && Array.isArray(result.users)) {
          setStudents(result.users);
        } else {
          console.error("Unexpected API response:", result);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchFeeStatus(selectedStudent);
    }
  }, [selectedStudent, selectedYear]);

  const fetchFeeStatus = async (studentName) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fetch_users?role=student",
        {
          name: studentName,
        }
      );

      if (response.data.success && Array.isArray(response.data.fees)) {
        const feeData = response.data.fees.reduce((acc, fee) => {
          if (fee.year === selectedYear) {
            acc[months[fee.month - 1]] = fee.status; // Convert month number to name
          }
          return acc;
        }, {});

        setFeeStatus(feeData);
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching fee status:", error);
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "black" }}>Fee Details</h2>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Fee
          </button>
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid grey",
            }}
            disabled={students.length === 0}
          >
            <option value="" disabled>
              Select Student
            </option>
            {students.map((student) => (
              <option key={student.id} value={student.name}>
                {student.name} (ID: {student.id})
              </option>
            ))}
          </select>

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

        {/* Fee Status Table */}
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
                  {feeStatus[month] || "Pending"}
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

export default TeacherFeeDetails;
