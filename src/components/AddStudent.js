import React, { useEffect, useState } from "react";
import "../styles/CommonStyle.css";
import { useNavigate } from "react-router-dom";
import { useElearningContext } from "./elearningContext";

const AddStudent = () => {
  const { state, dispatch } = useElearningContext();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");

  const [inputValue, setInputValue] = useState({
    fullName: "",
    email: "",
    PasswordHash: "abc@123",
    role: "Student",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:44345/api/Student/AddNewStudent",
        {
          method: "POST",
          body: JSON.stringify(inputValue),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data !== null) {
        navigate("/dashboard", {
          state: { user: { role: role, fullName: fullName } },
        });
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className="parentContainer">
      <div className="prodTablediv">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter Student Full Name"
              name="fullName"
              value={inputValue.fullName}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={inputValue.email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <button className="btn-submt">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
