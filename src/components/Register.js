import React, { useState } from "react";
import { useElearningContext } from "./elearningContext";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { state, dispatch } = useElearningContext();
  const [inputvalue, setInputValue] = useState({
    fullName: "",
    email: "",
    PasswordHash: "",
    role: "Student",
  });
  const navigate = useNavigate();

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };

  const hanleLoginform = async (e) => {
    e.preventDefault();
    if (
      inputvalue.fullName.trim() === "" ||
      inputvalue.email.trim() === "" ||
      inputvalue.PasswordHash.trim() === "" ||
      inputvalue.role.trim() === ""
    ) {
      alert("Please enter full name email, password, and role");
      return false;
    }
    console.log(inputvalue);
    try {
      const response = await fetch(
        "https://localhost:44345/api/Student/Register",
        {
          method: "POST",
          body: JSON.stringify(inputvalue),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (data !== null) {
        navigate("/login");
      } else {
        console.log("Something went Wrong");
      }
    } catch (error) {
      console.log("Something went Wrong", error);
    }
  };

  return (
    <div className="loginDiv">
      <h2>Register</h2>
      <form onSubmit={hanleLoginform}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={inputvalue.fullName}
            placeholder="Enter Full Name"
            onChange={handleInputValue}
          />
        </div>
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
            name="PasswordHash"
            value={inputvalue.PasswordHash}
            onChange={handleInputValue}
          />
        </div>
        <div>
          <label>Role</label>
          <select
            name="role"
            value={inputvalue.role}
            onChange={handleInputValue}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
        <button className="btn-login">Register</button>
        <p>
          Have already an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
