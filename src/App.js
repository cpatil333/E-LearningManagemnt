import "./App.css";
import { ElearningContextProvider } from "./components/elearningContext";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TeacherCourseList from "./components/TeacherCourseList";
import AddCourse from "./components/AddCourse";
import AddLessons from "./components/AddLessons";
import ManageQuizzes from "./components/ManageQuizzes";
import ManageStudents from "./components/ManageStudents";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import StudentCourseList from "./components/StudentCourseList";
import UpcomingQuizzes from "./components/UpcomingQuizzes";
import CompletedLessons from "./components/CompletedLessons";

function App() {
  return (
    <div className="App">
      <ElearningContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/TeacherCourseList" element={<TeacherCourseList />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/add-lesson" element={<AddLessons />} />
            <Route path="/manageQuizzes" element={<ManageQuizzes />} />
            <Route path="/manageStudents" element={<ManageStudents />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/update-student/:id" element={<UpdateStudent />} />
            <Route path="/StudentCourseList" element={<StudentCourseList />} />
            <Route path="/upcomingQuizzes" element={<UpcomingQuizzes />} />
            <Route path="/completedLessons" element={<CompletedLessons />} />
          </Routes>
        </Router>
      </ElearningContextProvider>
    </div>
  );
}

export default App;
