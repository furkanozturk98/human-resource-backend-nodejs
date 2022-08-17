"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid = __importStar(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:in-memory-dao');
class EmployeeDao {
    constructor() {
        this.employees = [];
        log('Created new instance of employeesDao');
    }
    addEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            employee.id = shortid.generate();
            this.employees.push(employee);
            return employee.id;
        });
    }
    getemployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employees;
        });
    }
    getEmployeeById(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employees.find((employee) => employee.id === employeeId);
        });
    }
    putEmployeeById(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.employees.findIndex((obj) => obj.id === employee.id);
            this.employees.splice(objIndex, 1, employee);
            return `${employee.id} updated via put`;
        });
    }
    removeEmployeeById(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.employees.findIndex((obj) => obj.id === employeeId);
            this.employees.splice(objIndex, 1);
            return `${employeeId} removed`;
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.employees.findIndex((obj) => obj.email === email);
            let currentemployee = this.employees[objIndex];
            if (currentemployee) {
                return currentemployee;
            }
            else {
                return null;
            }
        });
    }
}
exports.default = new EmployeeDao();
//# sourceMappingURL=EmployeeDao.js.map