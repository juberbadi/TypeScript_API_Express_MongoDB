"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var employeeController_1 = require("../controllers/employeeController");
var authChecker_1 = require("../middleware/authChecker");
var router = (0, express_1.Router)();
router.post("/create-employee", authChecker_1.authChecker, employeeController_1.createEmployeeData);
router.get("/get-employees", authChecker_1.authChecker, employeeController_1.getEmployees);
router.get("/get-employee/:id", authChecker_1.authChecker, employeeController_1.getEmployee);
router.put("/update-employee/:id", authChecker_1.authChecker, employeeController_1.updateEmployee);
router.delete("/delete-employee/:id", authChecker_1.authChecker, employeeController_1.deleteEmployee);
exports.default = router;