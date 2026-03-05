import React, { useState } from "react";
import "../styles/pages/login.css";
import academicsImage from "../assets/academics_1.jpg";
import { login } from "../services/api_service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(userName, password);
      // Store token securely in cookies
      Cookies.set("authToken", data.token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("userRole", data.user.role, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("userName", data.user.userName, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      toast.success("Login Successfully!");
      // navigate("/dashboard");
      console.log(`${data.user.role}`);
      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else if (data.user.role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/student-dashboard/feedetails");
      }
    } catch (error) {
      setError(error);
      toast.error(error.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <img
          src={academicsImage}
          alt="School Logo"
          style={{ width: "50%", objectFit: "cover" }}
        />
        <div className="login">
          <h4 className="lgoin">Login</h4>
          <form onSubmit={handlelogin}>
            <div className="text_area">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={userName}
                className="text_input"
                onChange={(e) => setuserName(e.target.value)}
                required
              />
            </div>
            <div className="text_area">
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                className="text_input"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="error-message">
                {"Username or Password Incorrect."}
              </p>
            )}
            <input
              type="submit"
              value={loading ? "Logging in..." : "LOGIN"}
              className="btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
