const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    default: 0,
  },
  Salary: {
    type: Number,
    default: 0,
  },
  Address: {
    type: String,
    default: "",
  },
  Gender: {
    type: String,
    enum: ["male", "female", ""], // Enumerate possible gender values
    default: "",
  },
  Department: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
