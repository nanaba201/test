import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import "react-dropdown/style.css";

function TeacherTransferCertificateDetails() {
  const data = [
    { id: 1, name: "Alice", role: "Developer" },
    { id: 2, name: "Bob", role: "Designer" },
    { id: 3, name: "Charlie", role: "Manager" },
  ];
  const options = ["Teacher", "Students"];
  const defaultOption = options[0];
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
        {/* Header and Search Box Row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            marginRight: "10px",
          }}
        >
          <h2 style={{ color: "black" }}>Transfer Certificate Details</h2>
          <button>Add T/C</button>
        </div>

        {/* Content Table */}
        <div>
          <table
            style={{
              width: "80vw",
              borderCollapse: "collapse",
              marginTop: "20px",
              border: "1px solid grey",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ padding: "10px", border: "1px solid grey" }}>
                  News Title
                </th>
                <th style={{ padding: "10px", border: "1px solid grey" }}>
                  Date
                </th>
                <th style={{ padding: "10px", border: "1px solid grey" }}>
                  Enable/Disable
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: "10px", border: "1px solid grey" }}>
                    {user.id}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid grey" }}>
                    {user.name}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid grey" }}>
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default TeacherTransferCertificateDetails;
