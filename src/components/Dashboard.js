import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useElearningContext } from "./elearningContext";

const Dashboard = () => {
  const { state, dispatch } = useElearningContext();
  const [dashboardContent, setDashboardContent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (user?.role === "Teacher") {
        setDashboardContent(<TeacherDashboard />);
      } else if (user?.role === "Student") {
        setDashboardContent(<StudentDashboard />);
      }
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h1>
        Welcome, {user?.fullName}{" "}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </h1>
      {dashboardContent}
    </div>
  );
};

// TeacherDashboard Component
const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (cardType) => {
    switch (cardType) {
      case "teacherCourses":
        navigate("/TeacherCourseList");
        break;
      case "manageQuizzes":
        // Fetch and display quizzes for management
        navigate("/ManageQuizzes");
        break;
      case "addLessons":
        // Navigate to the lesson creation page
        navigate("/add-lesson");
        break;
      case "manageStudents":
        // Fetch and display the list of students
        navigate("/manageStudents");
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-section">
      <h2>Teacher Dashboard</h2>
      <div
        className="dashboard-card"
        onClick={() => handleCardClick("teacherCourses")}
      >
        My Courses
      </div>
      <div
        className="dashboard-card"
        onClick={() => handleCardClick("manageQuizzes")}
      >
        Manage Quizzes
      </div>
      <div
        className="dashboard-card"
        onClick={() => handleCardClick("addLessons")}
      >
        Add Lessons
      </div>
      <div
        className="dashboard-card"
        onClick={() => handleCardClick("manageStudents")}
      >
        Manage Students
      </div>
    </div>
  );
};

// StudentDashboard Component
const StudentDashboard = () => {
  const navigate = useNavigate();
  const handleCardClick = (cardType) => {
    switch (cardType) {
      case "studentCourses":
        navigate("/StudentCourseList");
        break;
      case "upcomingQuizzes":
        // Fetch and display upcoming quizzes for the student
        navigate("/upcomingQuizzes");
        break;
      case "completedLessons":
        // Fetch and display completed lessons
        navigate("/completedLessons");
        break;
      case "classDiscussions":
        // Navigate to class discussion page or fetch discussions
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-section">
      <h2>Student Dashboard</h2>
      <div
        className="dashboard-card"
        onClick={() => handleCardClick("studentCourses")}
      >
        My Courses
      </div>
      <div
        className="dashboard-card"
        onClick={() => handleCardClick("upcomingQuizzes")}
      >
        Upcoming Quizzes
      </div>
      <div
        className="dashboard-card"
        onClick={() => handleCardClick("completedLessons")}
      >
        Completed Lessons
      </div>
      <div className="dashboard-card">Class Discussions</div>
    </div>
  );
};

export default Dashboard;
