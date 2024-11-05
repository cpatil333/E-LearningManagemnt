import React, { useEffect, useState } from "react";
import { useElearningContext } from "./elearningContext";
import "../styles/CommonStyle.css";
import { useNavigate } from "react-router-dom";

const StudentCourseList = () => {
  const { state, dispatch } = useElearningContext();
  const [studentCourse, setStudentCourse] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getStudentCourse();
  });

  const getStudentCourse = async () => {
    try {
      const url = `https://localhost:44345/api/Course/GetStudentCourses/${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected "Authorization" header
        },
      });
      const data = await response.json();
      if (data !== null) {
        setStudentCourse(data);;
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  const handleDashboard = () => {
    navigate("/dashboard", {
      state: { user: { fullName: fullName, role: role } },
    });
  };

  return (
    <div className="parentContainer">
      <div className="prodTablediv">
        <div className="action-bar">
          <button className="btn-back" onClick={handleDashboard}>
            Dashboard
          </button>
        </div>
        {studentCourse.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Course Nmae</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {studentCourse.map((course) => (
                <tr key={course.courseId}>
                  <td style={{ textAlign: "left" }}>{course.title}</td>
                  <td style={{ textAlign: "left" }}>{course.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No courses available for you!</p>
        )}
      </div>
    </div>
  );
};

export default StudentCourseList;
