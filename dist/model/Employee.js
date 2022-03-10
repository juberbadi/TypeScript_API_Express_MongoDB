"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EmployeeSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: String },
});
exports.default = (0, mongoose_1.model)("Employee", EmployeeSchema);
