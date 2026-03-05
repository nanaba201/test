import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { register } from "../../../services/api_service";
import Sidebar from "../../../components/Sidebar";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { ToastContainer, toast } from "react-toastify";
import "../../../styles/pages/dashboard/addnewuser.css";

function StudentAddNewUser() {
  const options = ["teacher", "student", "admin"];
  // Default role
  const [selectedRole, setSelectedRole] = useState("student");
  const [isOpen, setIsOpen] = useState(false);
  // Store users from API
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  // Fetch users when role changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/fetch_users?role=${selectedRole}`
        );
        const result = await response.json();
        if (result.success) {
          setUsers(result.users);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        toast.error("Error fetching users.");
      }
    };

    fetchUsers();
  }, [selectedRole]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(
        userData.userName,
        userData.password,
        userData.role,
        userData.name
      );
      toast.success("New User Added!");
      setIsOpen(false);
      setUserData({ userName: "", password: "", role: "", name: "" });

      // Re-fetch users for the selected role
      const updatedResponse = await fetch(
        `http://localhost:5000/fetch_users?role=${selectedRole}`
      );
      const updatedResult = await updatedResponse.json();
      if (updatedResult.success) {
        setUsers(updatedResult.users);
      }
    } catch (error) {
      toast.error(`Registration Failed: ${error}`);
    }
  };

  return (
    <div className="container">
      <Sidebar />

      <div className="content">
        <div className="table-header">
          <div className="table-title">Users</div>

          {/* Role Selection Dropdown */}
          <div className="dropdown-container">
            <Dropdown
              options={options}
              value={selectedRole}
              // Update role on change
              onChange={(option) => setSelectedRole(option.value)}
              placeholder="Select Role"
            />
          </div>

          <button className="register-button" onClick={() => setIsOpen(true)}>
            Add New User
          </button>

          {isOpen && (
            <div className="modal" onClick={() => setIsOpen(false)}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 style={{ color: "black" }}>Register New User</h2>
                <form onSubmit={handleRegister}>
                  <input
                    className="input-container"
                    type="text"
                    name="userName"
                    color="black"
                    placeholder="UserName"
                    value={userData.userName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="input-container"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="input-container"
                    type="text"
                    name="role"
                    placeholder="Role"
                    value={userData.role}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="input-container"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit" className="modal-button">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Table with API Data */}
        <table className="data-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td> {/* Display row number */}
                  <td>{user.name}</td>
                  <td>{user.userName}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>

        <Outlet />
      </div>
    </div>
  );
}

export default StudentAddNewUser;
