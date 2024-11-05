import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
const Login = () => {
  const [inputvalue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };

  const hanleLoginform = async (e) => {
    e.preventDefault();
    if (inputvalue.email.trim() === "" || inputvalue.password.trim() === "") {
      alert("Please enter email and password");
      return false;
    }
    try {
      const response = await fetch("https://localhost:44345/api/Login/Login", {
        method: "POSt",
        body: JSON.stringify(inputvalue),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.loginModel.userId);
        localStorage.setItem("fullName",  data.loginModel.fullName);
        localStorage.setItem("role",  data.loginModel.role);
        // const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
        // const userEmail = decodedToken.email;
        // const userRole = decodedToken.role;
        // console.log(decodedToken);
        // Navigate to Dashboard with user data
        // navigate("/dashboard"); // Uncomment if using navigation
        //  <Dashboard user={{ role: data.role }} />;
        // <Dashboard user={{ role: data?.role || 'defaultRole' }} />;
        // Navigate to Dashboard with user data

        navigate("/dashboard", {
          state: { user: { fullName: data.loginModel.fullName || "Default Name", email: data.loginModel.email || "example@example.com", role: data.loginModel.role || "Student" } },
        });
      } else {
        console.log("Something went Wrong");
      }
    } catch (error) {
      console.log("Something went Wrong", error);
    }
  };

  return (
    <div className="loginDiv">
      <h2>Login</h2>
      <form onSubmit={hanleLoginform}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputvalue.email}
            placeholder="Enter Eamil"
            onChange={handleInputValue}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={inputvalue.password}
            onChange={handleInputValue}
          />
        </div>
        <button className="btn-login">Login</button>
        <p>
          Don't have account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};


export default Login;
