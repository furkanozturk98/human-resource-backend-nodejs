"use strict";
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
const EmployeeService_1 = __importDefault(require("../services/EmployeeService"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:employees-controller');
class employeesMiddleware {
    constructor() {
        // Here we need to use an arrow function to bind `this` correctly
        this.validatePatchEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.email) {
                log('Validating email', req.body.email);
                this.validateSameEmailBelongToSameemployee(req, res, next);
            }
            else {
                next();
            }
        });
    }
    validateRequiredemployeeBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if (req.body && req.body.email && req.body.firstName) {
                next();
            }
            else {
                res.status(400).send({ error: `Missing required fields email or first name` });
            }
        });
    }
    validateSameEmailDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeService_1.default.getEmployeeByEmail(req.body.email);
            if (employee) {
                res.status(400).send({ error: `employee email already exists` });
            }
            else {
                next();
            }
        });
    }
    validateSameEmailBelongToSameemployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeService_1.default.getEmployeeByEmail(req.body.email);
            if (employee && employee.id === req.params.employeeId) {
                next();
            }
            else {
                res.status(400).send({ error: `Invalid email` });
            }
        });
    }
    validateemployeeExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeService_1.default.show(req.params.employeeId);
            if (employee) {
                next();
            }
            else {
                res.status(404).send({ error: `employee ${req.params.employeeId} not found` });
            }
        });
    }
    extractemployeeId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.employeeId;
            next();
        });
    }
}
exports.default = new employeesMiddleware();
//# sourceMappingURL=EmployeeMiddleware.js.map