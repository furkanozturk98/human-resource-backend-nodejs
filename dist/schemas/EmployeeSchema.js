"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const EmployeeSchema = new mongoose_1.Schema({
    id: { type: mongoose_2.default.Schema.Types.ObjectId, required: false },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    company_id: Number,
});
const employees = mongoose_2.default.model("employee", EmployeeSchema);
exports.default = employees;
//# sourceMappingURL=EmployeeSchema.js.map