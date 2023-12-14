import React, { useState, useEffect } from "react";
import "./Emp.css";
import axios from "axios";
import Modal from "react-modal";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    // Fetch employees from the database
    axios
      .get("http://localhost:5000/employee")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleEdit = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (employeeId) => {
    try {
      // Delete employee from the database
      await axios.delete(`http://localhost:5000/employee/delete/${employeeId}`);

      // Update the table after deletion
      const updatedEmployees = employees.filter(
        (emp) => emp._id !== employeeId
      );
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/employee/update/${selectedEmployee._id}`,
        selectedEmployee
      );

      const updatedEmployee = response.data;

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === updatedEmployee._id ? updatedEmployee : employee
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleView = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEmployeesWithSalaryRange = filteredEmployees.filter(
    (employee) =>
      (!minSalary ||
        (employee.Salary && employee.Salary >= parseFloat(minSalary))) &&
      (!maxSalary ||
        (employee.Salary && employee.Salary <= parseFloat(maxSalary)))
  );

  return (
    <div>
      <div className="heading">
        <h1 className="animated-heading">Employee List</h1>
      </div>
      <div className="horizontal-line"></div>

      <div className="search-salary-container">
        <div className="search-container">
          {/* Add search input field */}
          <input
            type="text"
            placeholder="Search by name or department"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span
            className="search-icon"
            role="img"
            aria-label="Search Icon"
            onClick={() => console.log("Search")}
          >
            🔍
          </span>
        </div>

        <div className="salary-filter-container">
          <input
            type="number"
            placeholder="Min Salary"
            className="salary-filter-input"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Salary"
            className="salary-filter-input"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployeesWithSalaryRange.map((employee) => (
            <tr key={employee._id}>
              <td>{`${employee.FirstName}`}</td>
              <td>{employee.Email}</td>
              <td>{employee.Department.toUpperCase()}</td>
              <td>{employee.Salary}</td>
              <td>
                <button onClick={() => handleView(employee._id)}>View</button>
              </td>
              <td>
                <button onClick={() => handleEdit(employee._id)}>✏️</button>
              </td>
              <td>
                <button onClick={() => handleDelete(employee._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Edit Employee"
        style={{
          content: {
            width: "50%",
            height: "70%",
            margin: "auto",
            overflow: "auto",
          },
        }}
      >
        <h2>Edit Employee</h2>
        {selectedEmployee && (
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label>
                First Name:
                <input
                  type="text"
                  value={selectedEmployee.FirstName}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      FirstName: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Email:
                <input
                  type="text"
                  value={selectedEmployee.Email}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      Email: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Age:
                <input
                  type="number"
                  value={selectedEmployee.Age}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      Age: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Salary:
                <input
                  type="number"
                  value={selectedEmployee.Salary}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      Salary: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Address:
                <input
                  type="text"
                  value={selectedEmployee.Address}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      Address: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Gender:
                <select
                  value={selectedEmployee.Gender}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      Gender: e.target.value,
                    })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                Department:
                <input
                  type="text"
                  value={selectedEmployee.Department}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      Department: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit">Save Changes</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="View Employee"
        style={{
          content: {
            width: "50%", // Adjust the width as needed
            height: "50%", // Adjust the height as needed
            margin: "auto",
          },
        }}
      >
        <h2>Employee Details</h2>
        {selectedEmployee && (
          <div className="view-modal-content">
            {selectedEmployee && (
              <>
                <h2>{selectedEmployee.FirstName}</h2>
                <hr />
                <p>
                  <strong>First Name:</strong> {selectedEmployee.FirstName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedEmployee.Email}
                </p>
                <p>
                  <strong>Age:</strong> {selectedEmployee.Age}
                </p>
                <p>
                  <strong>Salary:</strong> {selectedEmployee.Salary}
                </p>
                <p>
                  <strong>Address:</strong> {selectedEmployee.Address}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedEmployee.Gender}
                </p>
                <p>
                  <strong>Department:</strong> {selectedEmployee.Department}
                </p>
              </>
            )}
          </div>
        )}
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default EmployeeTable;
