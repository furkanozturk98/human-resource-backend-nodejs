"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || '5000';
const app = new app_1.default(parseInt(PORT, 10));
app.listen();
app.database.connect();
//# sourceMappingURL=server.js.map