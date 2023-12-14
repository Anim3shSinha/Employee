import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const Graphs = () => {
  const [departmentState, setDepartmentState] = useState({
    options: {
      chart: {
        id: "department-bar",
        type: "bar",
        height: 200, // Adjust the height as needed
      },
      xaxis: {
        categories: [], // Will be filled with department names
      },
    },
    series: [
      {
        name: "Number of Employees",
        data: [], // Will be filled with corresponding employee counts
      },
    ],
  });

  const [ageState, setAgeState] = useState({
    options: {
      chart: {
        id: "age-bar",
        type: "bar",
        height: 200, // Adjust the height as needed
      },
      xaxis: {
        categories: ["20-30", "30-40", "40-50", "50-60"], // Age ranges
      },
    },
    series: [
      {
        name: "Number of Employees",
        data: [0, 0, 0, 0], // Will be filled with corresponding employee counts
      },
    ],
  });

  useEffect(() => {
    // Fetch all employees
    axios
      .get("http://localhost:5000/employee")
      .then((response) => {
        const employees = response.data;

        // Count the number of employees in each department
        const departmentCounts = employees.reduce((acc, employee) => {
          const department = employee.Department;

          if (!acc[department]) {
            acc[department] = 1;
          } else {
            acc[department]++;
          }

          return acc;
        }, {});

        // Extract department names and employee counts from the result
        const departments = Object.keys(departmentCounts);
        const employeeCounts = Object.values(departmentCounts);

        // Update state with the fetched data for the department chart
        setDepartmentState({
          options: {
            ...departmentState.options,
            xaxis: {
              categories: departments,
            },
          },
          series: [
            {
              name: "Number of Employees",
              data: employeeCounts,
            },
          ],
        });

        // Count the number of employees in each age range
        const ageCounts = employees.reduce(
          (acc, employee) => {
            const age = employee.Age;

            if (age >= 20 && age < 30) {
              acc[0]++;
            } else if (age >= 30 && age < 40) {
              acc[1]++;
            } else if (age >= 40 && age < 50) {
              acc[2]++;
            } else if (age >= 50 && age < 60) {
              acc[3]++;
            }

            return acc;
          },
          [0, 0, 0, 0]
        );

        // Update state with the fetched data for the age chart
        setAgeState({
          options: {
            ...ageState.options,
          },
          series: [
            {
              name: "Number of Employees",
              data: ageCounts,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div>
      <h2
        style={{
          background: "#2196f3",
          color: "#fff",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        Charts for Different Data
      </h2>

      {/* Department Chart */}
      <div
        className="chart-container"
        style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}
      >
        Employees per department
        <Chart
          options={departmentState.options}
          series={departmentState.series}
          type="bar"
          width="500"
        />
      </div>

      {/* Age Chart */}
      <div
        className="chart-container"
        style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}
      >
        Number of Employees in Each Age Range
        <Chart
          options={ageState.options}
          series={ageState.series}
          type="bar"
          width="500"
        />
      </div>
    </div>
  );
};

export default Graphs;
