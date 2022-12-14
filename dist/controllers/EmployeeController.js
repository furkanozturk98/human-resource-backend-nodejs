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
const EmployeeService_1 = __importDefault(require("../services/EmployeeService"));
const argon2 = __importStar(require("argon2"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:employees-controller');
class EmployeeController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield EmployeeService_1.default.list(15, 1);
            res.status(200).send({ data: employees });
        });
    }
    getEmployeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeService_1.default.show(req.params.employeeId);
            res.status(200).send(employee);
        });
    }
    creatEemployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // req.body.password = await argon2.hash(req.body.password);
            const employee = yield EmployeeService_1.default.create(req.body);
            res.status(201).send();
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2.hash(req.body.password);
            log(yield EmployeeService_1.default.update(req.params.employeeId, req.body));
            res.status(204).send(``);
        });
    }
    removEemployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield EmployeeService_1.default.delete(req.params.employeeId));
            res.status(204).send(``);
        });
    }
}
exports.default = new EmployeeController;
//# sourceMappingURL=EmployeeController.js.map