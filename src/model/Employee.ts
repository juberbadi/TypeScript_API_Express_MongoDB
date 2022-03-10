import { Schema, model, Document } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  position: string;
  office: string;
  salary: string;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String },
  position: { type: String },
  office: { type: String },
  salary: { type: String },
});

export default model<IEmployee>("Employee", EmployeeSchema);
