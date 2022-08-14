import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const EmployeeSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: false },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    company_id: Number,
});

const employees = mongoose.model("employee", EmployeeSchema);

export default employees;