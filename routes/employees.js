const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

//GET All 200
router.get("/", async (req, res) => {
  try {
    const emps = await Employee.find();
    res.status(200).json(emps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//POST Create New 201
router.post("/", async (req, res) => {
  const employee = new Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    salary: req.body.salary,
    email: req.body.email,
    gender: req.body.gender,
  });
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET One 200
router.get("/:id", getEmployee, (req, res) => {
  res.send(res.employee);
});
//PUT Update One 200
router.put("/:id", async (req, res) => {
  try {
    const updatedEmp = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({ message: "Employee details updated" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//DEL Delete One 204
router.delete("/", async (req, res) => {
  try {
    const id = req.query.eid;
    if (id === undefined) {
      res.status(400).json({
        status: false,
        message: "Id is required for deletion",
      });
      return;
    }

    const emp = await Employee.findByIdAndDelete(id);

    if (!emp) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(204).json({ message: "Employee Removed" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

async function getEmployee(req, res, next) {
  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: "Cannot find employee" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.employee = employee;
  next();
}

module.exports = router;
