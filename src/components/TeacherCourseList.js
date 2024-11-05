import React, {useState, useEffect } from "react";
import { useElearningContext } from "./elearningContext";
import "../styles/CommonStyle.css";
import { Link, useNavigate } from "react-router-dom";

const TeacherCourseList = () => {
  const { state, dispatch } = useElearningContext();
  const [teacherCourse, setTeacherCourse] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");
  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
      getTeacherCousre();
    }
  });

  const getTeacherCousre = async () => {
    try {
      const url = `https://localhost:44345/api/Course/GetCourses/${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected "Authorization" header
        },
      });
      const data = await response.json();
      if (data !== null) {
        setTeacherCourse(data);
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
          <button className="btn-add">
            <Link
              to={"/add-course"}
              style={{ color: "white", textDecoration: "none" }}
            >
              Add New Course
            </Link>
          </button>
        </div>
        {teacherCourse.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Course Nmae</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teacherCourse.map((course) => (
                <tr key={course.courseId}>
                  <td style={{ textAlign: "left" }}>{course.title}</td>
                  <td style={{ textAlign: "left" }}>{course.description}</td>
                  <td>
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No courses available for teacher</p>
        )}
      </div>
    </div>
  );
};

export default TeacherCourseList;
