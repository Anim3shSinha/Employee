import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../assests/logo.png";
import Hero from "../../assests/hero.png";
import "./Landing.css";

import { Link } from "react-router-dom";
import Chart from "../Chart/Chart";

const LandingPage = () => {
  const [employeeStats, setEmployeeStats] = useState({
    totalEmployees: 0,
    averageSalary: 0,
    averageAge: 0,
  });

  useEffect(() => {
    // Fetch employee data from the database
    axios
      .get("http://localhost:5000/employee")
      .then((response) => {
        const employees = response.data;
        const totalEmployees = employees.length;

        // Calculate average salary and average age
        const totalSalary = employees.reduce(
          (sum, employee) => sum + (employee.Salary || 0),
          0
        );
        const totalAge = employees.reduce(
          (sum, employee) => sum + (employee.Age || 0),
          0
        );

        const averageSalary = totalEmployees ? totalSalary / totalEmployees : 0;
        const averageAge = totalEmployees ? totalAge / totalEmployees : 0;

        setEmployeeStats({
          totalEmployees,
          averageSalary,
          averageAge,
        });
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  return (
    <section>
      <div className="navbar-custom">
        <nav className="navbar-nav">
          <div className="A">
            <a href="#" className="navbar-brand">
              EMPLOYEE-HUB
            </a>
          </div>
          <div className="B">
            <Link to="/employee" className="nav-link">
              All Employees
            </Link>
            <Link to="/chart" className="nav-link">
              Charts
            </Link>
            <a href="#section1" className="nav-link">
              Employee Stats
            </a>
            <Link to="/new" className="nav-link">
              Add New
            </Link>
          </div>
        </nav>

        <section>
          <div className="hero">
            <div>Empowering Businesses</div>

            <div>
              <br />
              Empowering People
            </div>
          </div>
        </section>
        <section id="section1">
          <h2>Employee Stats</h2>
          {/* maxEmployees, emp */}
          <div className="charts">
            <div className="chart">
              Number of Employees
              <Chart maxEmployees={100} emp={employeeStats.totalEmployees} />
            </div>
            <div className="chart">
              Average Salary
              <Chart
                maxEmployees={100000}
                emp={Number(employeeStats.averageSalary).toFixed(1)}
              />
            </div>
            <div className="chart">
              Average Age
              <Chart
                maxEmployees={50}
                emp={Number(employeeStats.averageAge).toFixed(1)}
              />
            </div>
            <div className="chart">
              Average Employee per Department
              <Chart maxEmployees={10} emp={1.5} />
            </div>
          </div>
          <Link to="/chart" className="nav-link">
            View More...
          </Link>
        </section>

        <section id="section2">
          <footer
            style={{ backgroundColor: "#000", color: "#fff", padding: "20px" }}
          >
            <p>
              <strong>Contact Me to make better projects than this one:</strong>{" "}
              animeshsinha1007@gmail.com
            </p>
            <div>
              <a href="#">Privacy Policy</a>
              <span> | </span>
              <a href="#">Terms of Service</a>
            </div>
          </footer>
        </section>
      </div>
    </section>
  );
};

export default LandingPage;
