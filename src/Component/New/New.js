import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./New.css";
import Alert from "react-popup-alert";

function New() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    text: "",
    show: false,
  });

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Equivalent to history.goBack()
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      fullName,
      email,
      age,
      salary,
      address,
      selectedGender,
      selectedDepartment,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/employee/new",
        formData
      );
      if (response.status === 200) {
        setAlert({
          type: "success",
          text: "Employee added successfully",
          show: true,
        });
        console.log("Form submitted successfully");
        setFullName("");
        setEmail("");
        setAge("");
        setSalary("");
        setAddress("");
        setSelectedGender("");
        setSelectedDepartment("");
      } else {
        setAlert({
          type: "error",
          text: "Employee already exist",
          show: true,
        });
        console.error("Form submission failed");
      }
    } catch (error) {
      setAlert({
        type: "error",
        text: "Form submission failed",
        show: true,
      });
      console.error("Error submitting form:", error);
    }
  };

  function onCloseAlert() {
    setAlert({
      type: "",
      text: "",
      show: false,
    });
  }

  function onShowAlert(type) {
    setAlert({
      type: type,
      text: "Demo alert",
      show: true,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>
          New Employee <hr />
        </h2>

        <div className="form-body">
          <div className="form-column">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            <br />
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <label htmlFor="Email">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
            <br />
            <label htmlFor="Salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={salary}
              onChange={(event) => setSalary(event.target.value)}
            />
          </div>

          <div className="form-column">
            <label htmlFor="Address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <br />
            <label htmlFor="gender">Gender</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={selectedGender === "male"}
                onChange={handleGenderChange}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={selectedGender === "female"}
                onChange={handleGenderChange}
              />
              Female
            </label>
            <br />
            <label htmlFor="Department">Dempartment</label>
            <select
              id="department"
              name="department"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="">-- Select Department --</option>
              <option value="hr">Human Resources</option>
              <option value="it">Information Technology</option>
              <option value="finance">Finance</option>
              {/* Add more departments as needed */}
            </select>

            <br />
            <div className="btn">
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
            </div>
          </div>
        </div>
        <button type="submit" onClick={goBack}>
          {" "}
          Back{" "}
        </button>
      </form>
    </>
  );
}

export default New;
