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
const EmployeeDao_1 = __importDefault(require("../daos/EmployeeDao"));
const Employee_1 = __importDefault(require("../models/Employee"));
class EmployeeService {
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return Employee_1.default.paginate({}, {
                page: page,
                limit: limit
            });
        });
    }
    ;
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Employee_1.default.findById(id);
        });
    }
    ;
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return Employee_1.default.create(resource);
        });
    }
    update(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return Employee_1.default.findByIdAndUpdate(id, resource, { new: true }, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Updated Employee : ", docs);
                }
            });
        });
    }
    ;
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            Employee_1.default.findByIdAndDelete(id);
        });
    }
    ;
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return EmployeeDao_1.default.getEmployeeByEmail(email);
        });
    }
}
exports.default = new EmployeeService();
//# sourceMappingURL=EmployeeService.js.map