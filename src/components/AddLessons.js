import React, { useEffect, useState } from "react";
import "../styles/CommonStyle.css";
import { useNavigate } from "react-router-dom";
import { useElearningContext } from "./elearningContext";

const AddLessons = () => {
  const { state, dispatch } = useElearningContext();
  const userId = localStorage.getItem("userId");
  const [courseData, setCourseData] = useState([]);
  const [inputValue, setInputValue] = useState({
    title: "",
    content: "",
    courseId: "",
    order: "",
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("fullName");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    getTeacherCousre();
  }, []);

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
      console.log(data);

      if (data !== null) {
        setCourseData(data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://localhost:44345/api/Lesson/AddNewLesson",
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
        <h2>Add Lesson</h2>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label>Lesson Title</label>
            <input
              type="text"
              placeholder="Enter Lesson"
              name="title"
              value={inputValue.title}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label>Content</label>
            <input
              type="text"
              placeholder="Enter Content"
              name="content"
              value={inputValue.content}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label>Course</label>
            <select
              name="courseId"
              value={inputValue.courseId}
              onChange={handleChangeInput}
            >
              <option>Select Course</option>
              {courseData.map((couse) => (
                <option value={couse.courseId}>{couse.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Order</label>
            <input
              type="text"
              placeholder="Enter Order"
              name="order"
              value={inputValue.order}
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

export default AddLessons;
