import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Employee from "../model/Employee";


export const createEmployeeData: RequestHandler = async (req, res, next) => {
  const { name, email, position, office, salary } = req.body;

  try {
    const employee = await Employee.findOne({ email });

    if (employee) return next(createHttpError(406, "employee already exists"));

    const newEmployee = new Employee({ name, email, position, office, salary });

    await newEmployee.save();

    res.status(201).json({ name, email, position, office, salary });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const getEmployees: RequestHandler = async (req, res, next) => {
  try {
    const employee = await Employee.find({ });
    res.status(200).json({ employee });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const getEmployee: RequestHandler = async (req, res, next) => {
  const id: string = req.params.id;
  try {
    const employee = await Employee.findOne({ _id: id });
    res.status(200).json({ employee });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const deleteEmployee: RequestHandler = async (req, res, next) => {
  const id: string = req.params.id;
  try {
    const employee = await Employee.remove({ _id: id });
    if (!employee.deletedCount) return next(createHttpError(406, "employee not found"));
    res.status(201).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const updateEmployee: RequestHandler = async (req, res, next) => {
  const { name, email, position, office, salary } = req.body;
  const id: string = req.params.id;

  try {
    const employee = await Employee.updateOne({ _id:id }, {$set: { name, email, position, office, salary }});
    res.status(201).json({ name, email, position, office, salary });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};
