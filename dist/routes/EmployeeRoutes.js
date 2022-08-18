"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_config_1 = require("../common/routes.config");
const EmployeeController_1 = __importDefault(require("../controllers/EmployeeController"));
const EmployeeMiddleware_1 = __importDefault(require("../middlewares/EmployeeMiddleware"));
class EmployeesRoutes extends routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'EmployeesRoutes');
    }
    configureRoutes() {
        this.app.route(`/employees`)
            .get(EmployeeController_1.default.list)
            .post(EmployeeMiddleware_1.default.validateRequiredemployeeBodyFields, EmployeeMiddleware_1.default.validateSameEmailDoesntExist, EmployeeController_1.default.creatEemployee);
        this.app.param(`employeeId`, EmployeeMiddleware_1.default.extractemployeeId);
        this.app.route(`/employees/:employeeId`)
            .all(EmployeeMiddleware_1.default.validateemployeeExists)
            .get(EmployeeController_1.default.getEmployeeById)
            .delete(EmployeeController_1.default.removEemployee);
        this.app.put(`/employees/:employeeId`, [
            EmployeeMiddleware_1.default.validateRequiredemployeeBodyFields,
            EmployeeMiddleware_1.default.validateSameEmailBelongToSameemployee,
            EmployeeController_1.default.put
        ]);
        return this.app;
    }
}
exports.default = EmployeesRoutes;
//# sourceMappingURL=EmployeeRoutes.js.map