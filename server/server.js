const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://animesh:animesh@cluster0.ezibghm.mongodb.net/employee"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

const Employee = require("./model");

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.get("/employee", async (req, res) => {
  const EmployeeList = await Employee.find();
  res.json(EmployeeList);
});

app.post("/employee/new", async (req, res) => {
  try {
    const {
      fullName,
      email,
      age,
      salary,
      address,
      selectedGender,
      selectedDepartment,
    } = req.body;

    const existingEmployee = await Employee.findOne({ Email: email });

    if (existingEmployee) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newEmployee = new Employee({
      FirstName: fullName,
      Email: email,
      Age: age,
      Salary: salary,
      Address: address,
      Gender: selectedGender,
      Department: selectedDepartment,
    });
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/employee/delete/:id", async (req, res) => {
  const result = await Employee.findByIdAndDelete(req.params.id);
  res.json({ result });
});

app.put("/employee/update/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  (employee.FirstName = req.body.FirstName || employee.FirstName),
    (employee.SecondName = req.body.SecondName || employee.SecondName),
    (employee.Email = req.body.Email || employee.Email),
    (employee.Phone = req.body.Phone || employee.Phone),
    (employee.Salary = req.body.Salary || employee.Salary),
    (employee.Department = req.body.Department || employee.Department),
    employee.save();

  res.json(employee);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
